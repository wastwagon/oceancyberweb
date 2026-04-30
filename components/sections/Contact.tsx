"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import { HeroSectionMotionLayers } from "@/components/layout/HeroSectionMotionLayers";
import { WhatsAppButton } from "@/components/ghana-specific/WhatsAppButton";
import {
  fadeFromLeft,
  fadeFromRight,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";

const contactItems = [
  {
    title: "Address",
    content: "232 Nii Kwashiefio Avenue, Accra, Ghana",
    icon: MapPin,
  },
  {
    title: "Phone",
    content: "+233 242 565 695",
    link: "tel:+233242565695",
    icon: Phone,
  },
  {
    title: "Email",
    content: "info@oceancyber.net",
    link: "mailto:info@oceancyber.net",
    icon: Mail,
  },
] as const;

const contactHeaderEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const contactHeaderContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.06,
    },
  },
};

const contactHeaderItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: contactHeaderEase },
  },
};

function ContactAmbient() {
  return null;
}

export type ContactProps = {
  /** Use on the dedicated `/contact` page so the hero copy animates immediately. */
  revealHeaderOnMount?: boolean;
};

function TopicFromUrl({ onTopic }: { onTopic: (topic: string) => void }) {
  const searchParams = useSearchParams();
  const applied = useRef(false);
  useEffect(() => {
    if (applied.current) return;
    const topic = searchParams.get("topic");
    if (!topic) return;
    applied.current = true;
    onTopic(topic);
  }, [searchParams, onTopic]);
  return null;
}

export function Contact({ revealHeaderOnMount = false }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const applyTopicFromUrl = useCallback((topic: string) => {
    setMessage((prev) => {
      if (prev.trim() !== "") return prev;
      return `I'm interested in: ${topic}\n\n`;
    });
  }, []);

  useEffect(() => {
    if (status !== "success") return;
    if (name.trim() || email.trim() || message.trim()) {
      setStatus("idle");
    }
  }, [name, email, message, status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again or use email/WhatsApp."
        );
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <section
      id="contact"
      className="sa-section relative overflow-hidden"
    >
      <ContactAmbient />
      <div className="sa-container">
        <Suspense fallback={null}>
          <TopicFromUrl onTopic={applyTopicFromUrl} />
        </Suspense>
        <motion.div
          className="mb-16 text-center md:mb-20"
          initial="hidden"
          {...(revealHeaderOnMount
            ? { animate: "visible" as const }
            : {
                whileInView: "visible" as const,
                viewport: revealViewport,
              })}
          variants={contactHeaderContainer}
        >
          <motion.span
            variants={contactHeaderItem}
            className="sa-eyebrow mb-6 inline-flex items-center justify-center gap-2"
          >
            Contact
          </motion.span>
          <motion.h2
            variants={contactHeaderItem}
            className="sa-title mx-auto mb-5 max-w-4xl text-balance text-center"
          >
            Start a conversation
            <br />
            <span className="text-sa-primary">
              about your next release
            </span>
          </motion.h2>
          <motion.p
            variants={contactHeaderItem}
            className="sa-subtitle mx-auto"
          >
            Share your goals, timeline, and constraints — we respond with clear next
            steps and a sensible engagement path.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
          <motion.div
            {...fadeFromLeft}
            transition={{ ...fadeFromLeft.transition, delay: 0.1 }}
            className="space-y-10"
          >
            <div>
              <h3 className="font-heading mb-8 border-l-4 border-sa-primary pl-4 text-2xl font-bold text-white md:text-3xl">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={revealViewport}
                      transition={staggerDelay(index, 0.08)}
                      className="sa-card group flex items-start gap-5 p-4 transition-all duration-300"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-sa-border bg-black/40 transition-all group-hover:border-sa-primary group-hover:bg-sa-primary/10">
                        <Icon
                          className="h-5 w-5 text-sa-primary transition-colors group-hover:text-sa-primary"
                          aria-hidden
                        />
                      </div>
                      <div className="min-w-0 py-1">
                        <div className="font-heading mb-1 text-sm font-semibold uppercase tracking-widest text-sa-muted/50">
                          {item.title}
                        </div>
                        {"link" in item && item.link ? (
                          <a
                            href={item.link}
                            className="font-heading text-lg text-white transition-colors hover:text-sa-primary"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <div className="font-heading text-lg text-white">
                            {item.content}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <WhatsAppButton variant="default" size="lg" className="h-14 w-full" />
            <Link
              href="/services/website-to-mobile-app"
              className="flex min-h-[56px] w-full items-center justify-center rounded-xl border border-sa-border bg-sa-surface px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:border-sa-primary hover:bg-black/20"
            >
              Convert your existing website into a mobile app
            </Link>
          </motion.div>

          <motion.div
            {...fadeFromRight}
            transition={{ ...fadeFromRight.transition, delay: 0.15 }}
            className="sa-card p-6 md:p-8 lg:mt-8"
          >
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {status === "success" ? (
                <p
                  className="rounded-xl border border-sa-primary/50 bg-sa-primary/10 px-4 py-3 text-sm text-sa-primary"
                  role="status"
                >
                  Thank you. Your message was sent. We&apos;ll get back to you soon.
                </p>
              ) : null}
              {status === "error" && errorMessage ? (
                <p
                  className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    className="ml-1 text-sm font-medium text-sa-muted/80"
                    htmlFor="contact-name"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-sa-border bg-sa-surface px-5 py-4 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="ml-1 text-sm font-medium text-sa-muted/80"
                    htmlFor="contact-email"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-sa-border bg-sa-surface px-5 py-4 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="ml-1 text-sm font-medium text-sa-muted/80"
                  htmlFor="contact-phone"
                >
                  Phone <span className="font-normal text-sa-muted/50">(optional)</span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                  placeholder="+233 XX XXX XXXX"
                  className="w-full rounded-xl border border-sa-border bg-sa-surface px-5 py-4 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="ml-1 text-sm font-medium text-sa-muted/80"
                  htmlFor="contact-message"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={message}
                  onChange={(ev) => setMessage(ev.target.value)}
                  placeholder="Tell us about your project..."
                  className="w-full resize-none rounded-xl border border-sa-border bg-sa-surface px-5 py-4 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="sa-btn-primary w-full min-h-[56px] disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
