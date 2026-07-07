"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, MessageSquare, X, Minimize2, Maximize2 } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api-config";
import { floatingChrome } from "@/components/ui/floating-chrome";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! Welcome to OceanCyber. How can we help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isMinimized]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmed,
      isUser: true,
      timestamp: new Date(),
    };

    const nextThread = [...messages, userMessage];
    setMessages(nextThread);
    setInputValue("");
    setIsTyping(true);

    const payload = {
      messages: nextThread.map((m) => ({
        role: m.isUser ? ("user" as const) : ("assistant" as const),
        content: m.text,
      })),
    };

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      const replyText =
        res.ok && typeof data.reply === "string" && data.reply.trim().length > 0
          ? data.reply.trim()
          : typeof data.error === "string"
            ? `Sorry, I could not process that (${data.error}). Try email at info@oceancyber.net or /contact.`
            : "Sorry, something went wrong. Please try again or use the Contact page.";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Network issue. Check your connection, or email info@oceancyber.net.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(floatingChrome.chat, floatingChrome.fab)}
        aria-label="Open chat assistant"
        data-app-print-hide-chrome
      >
        <MessageSquare className="h-6 w-6" strokeWidth={2} />
      </button>
    );
  }

  return (
    <>
      <div
        className={cn(
          "max-md:fixed max-md:inset-0 max-md:z-[160] max-md:bg-black/35 max-md:backdrop-blur-[2px] md:hidden",
          !isOpen && "max-md:pointer-events-none max-md:opacity-0",
        )}
        aria-hidden
        onClick={() => {
          setIsOpen(false);
          setIsMinimized(false);
        }}
      />

      <div
        className={cn(
          "flex flex-col overflow-hidden border border-sa-border bg-sa-bg shadow-2xl transition-all duration-300",
          "max-md:fixed max-md:inset-x-0 max-md:bottom-[var(--sa-mobile-tab-bar)] max-md:z-[165] max-md:max-h-[min(78dvh,640px)] max-md:rounded-t-[20px] max-md:border-x-0 max-md:border-b-0",
          "md:fixed md:bottom-6 md:right-6 md:z-[150] md:rounded-3xl",
          isMinimized
            ? "h-16 w-64 max-md:h-14 max-md:w-full"
            : "h-[min(85vh,580px)] w-[min(calc(100vw-2rem),24rem)] max-md:h-[min(78dvh,640px)] max-md:w-full",
        )}
        role="dialog"
        aria-label="OceanCyber chat"
        data-app-print-hide-chrome
      >
      <header className="flex shrink-0 flex-col border-b border-sa-border bg-sa-surface max-md:bg-[#1c1c1e]/95">
        <div className="flex justify-center pt-2 md:hidden">
          <div className="h-1 w-10 rounded-full bg-white/20" aria-hidden />
        </div>
        <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sa-primary/10 text-sa-primary ring-1 ring-sa-primary/20">
            <Bot className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-white md:font-heading md:text-sm md:font-bold md:uppercase md:tracking-widest">
              Assistant
            </h3>
            {!isMinimized && <p className="text-xs text-sa-primary md:text-[10px] md:font-bold md:uppercase md:tracking-widest">Online</p>}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="sa-pressable hidden rounded-lg p-2 text-sa-muted md:inline-flex"
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setIsMinimized(false);
            }}
            className="sa-pressable rounded-lg p-2 text-sa-muted"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        </div>
      </header>

      {!isMinimized && (
        <>
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col",
                    message.isUser ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      message.isUser
                        ? "bg-sa-primary text-black"
                        : "border border-sa-border bg-sa-surface text-sa-muted"
                    )}
                  >
                    {message.text}
                  </div>
                  <span className="mt-1.5 px-1 text-[9px] font-bold uppercase tracking-widest text-sa-muted/40">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-sa-border bg-sa-surface px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sa-primary" />
                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-sa-primary"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-sa-primary"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <footer className="shrink-0 border-t border-sa-border bg-sa-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))] max-md:bg-[#1c1c1e]/95">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message…"
                className="h-12 flex-1 rounded-xl border border-sa-border bg-sa-bg px-4 text-sm text-white outline-none ring-sa-primary/50 transition placeholder:text-sa-muted/30 focus:border-sa-primary focus:ring-1"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sa-primary text-black transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-widest text-sa-muted/40">
              Need help? <a href="mailto:info@oceancyber.net" className="text-sa-primary hover:underline">info@oceancyber.net</a>
            </p>
          </footer>
        </>
      )}
    </div>
    </>
  );
}
