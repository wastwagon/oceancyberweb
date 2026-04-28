"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
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

/** Light premium: soft blue grid + bloom (matches Services / Testimonials). */
function ContactAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(2, 106, 255, 0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(2, 106, 255, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, black 18%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(480px,65vh)] w-[min(92vw,760px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(2,106,255,0.1)_0%,transparent_70%)] blur-[90px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white/70 to-slate-100" />
    </div>
  );
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
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/95 to-slate-100/90 py-20 md:py-28"
    >
      <ContactAmbient />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[min(420px,52vh)] overflow-hidden">
        <div className="relative h-full w-full">
          <HeroSectionMotionLayers tone="light" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-6 md:px-8">
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
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-ocean-200 bg-ocean-50/95 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-ocean-800 shadow-sm will-change-transform"
          >
            <span
              className="flex h-2 w-2 animate-pulse rounded-full bg-ocean-500"
              aria-hidden
            />
            Get in touch
          </motion.span>
          <motion.h2
            variants={contactHeaderItem}
            className="mx-auto mb-5 max-w-4xl text-balance text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-6xl will-change-transform"
          >
            Let&apos;s Build Something
            <br />
            <span className="bg-gradient-to-r from-ocean-600 via-ocean-700 to-cyan-600 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </motion.h2>
          <motion.p
            variants={contactHeaderItem}
            className="mx-auto max-w-2xl text-center text-base font-light leading-relaxed text-slate-600 md:text-lg will-change-transform"
          >
            Ready to transform your digital presence? Reach out and let&apos;s
            turn your vision into a digital reality.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
          <motion.div
            {...fadeFromLeft}
            transition={{ ...fadeFromLeft.transition, delay: 0.1 }}
            className="space-y-10"
          >
            <div>
              <h3 className="mb-8 border-l-4 border-ocean-500 pl-4 text-2xl font-bold text-slate-900 md:text-3xl">
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
                      className="group flex items-start gap-5 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm ring-1 ring-slate-200/40 transition-all duration-300 hover:border-ocean-200/80 hover:shadow-md"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 transition-all group-hover:border-ocean-200 group-hover:bg-ocean-50/50">
                        <Icon
                          className="h-5 w-5 text-ocean-600 transition-colors group-hover:text-ocean-700"
                          aria-hidden
                        />
                      </div>
                      <div className="min-w-0 py-1">
                        <div className="mb-1 text-sm font-semibold uppercase tracking-widest text-slate-500">
                          {item.title}
                        </div>
                        {"link" in item && item.link ? (
                          <a
                            href={item.link}
                            className="text-lg text-slate-800 transition-colors hover:text-ocean-700"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <div className="text-lg text-slate-800">
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
          </motion.div>

          <motion.div
            {...fadeFromRight}
            transition={{ ...fadeFromRight.transition, delay: 0.15 }}
            className="rounded-[2.5rem] border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 md:p-8 lg:mt-8"
          >
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {status === "success" ? (
                <p
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
                  role="status"
                >
                  Thank you. Your message was sent. We&apos;ll get back to you soon.
                </p>
              ) : null}
              {status === "error" && errorMessage ? (
                <p
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    className="ml-1 text-sm font-medium text-slate-600"
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
                    className="w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-900 placeholder:text-slate-400 transition-all focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-200"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="ml-1 text-sm font-medium text-slate-600"
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
                    className="w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-900 placeholder:text-slate-400 transition-all focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="ml-1 text-sm font-medium text-slate-600"
                  htmlFor="contact-phone"
                >
                  Phone <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                  placeholder="+233 XX XXX XXXX"
                  className="w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-900 placeholder:text-slate-400 transition-all focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-200"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="ml-1 text-sm font-medium text-slate-600"
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
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-900 placeholder:text-slate-400 transition-all focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-200"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="min-h-[48px] w-full rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 py-4 font-bold text-white shadow-lg shadow-ocean-600/25 transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
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
