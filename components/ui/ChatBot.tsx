"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, MessageSquare, X, Minimize2, Maximize2 } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api-config";


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

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 text-white shadow-lg shadow-ocean-600/30 transition-all hover:brightness-110 hover:shadow-ocean-600/40 active:scale-[0.97] sm:bottom-6 sm:left-6 sm:h-11 sm:w-11"
        aria-label="Open chat"
      >
        <MessageSquare className="h-5 w-5 sm:h-[1.15rem] sm:w-[1.15rem]" strokeWidth={2.1} />
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-5 left-1/2 z-50 flex max-h-[min(85vh,560px)] w-[min(calc(100vw-2rem),22rem)] -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left shadow-2xl shadow-slate-300/50 ring-1 ring-slate-200/40 backdrop-blur-xl sm:bottom-6 sm:left-6 sm:max-h-[min(82vh,520px)] sm:w-[min(calc(100vw-3rem),24rem)] sm:translate-x-0"
      role="dialog"
      aria-label="OceanCyber chat"
    >
      <header className="shrink-0 border-b border-slate-200/80 bg-gradient-to-r from-ocean-600 to-ocean-800 px-4 py-3.5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30">
              <Bot className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold tracking-tight sm:text-base">
                OceanCyber Assistant
              </h3>
              <p className="text-xs text-sky-100/90">Always here to help</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              className="rounded-lg p-2 text-white/95 transition-colors hover:bg-white/15"
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
              className="rounded-lg p-2 text-white/95 transition-colors hover:bg-white/15"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {!isMinimized ? (
        <>
          <div className="flex min-h-0 flex-1 flex-col bg-slate-50/95">
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3 sm:px-4 sm:py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 sm:max-w-[85%] sm:px-4 sm:py-3 ${
                      message.isUser
                        ? "border border-ocean-500/30 bg-gradient-to-b from-ocean-600 to-ocean-800 text-white shadow-md shadow-ocean-600/20"
                        : "border border-slate-200/90 bg-white text-slate-800 shadow-sm ring-1 ring-slate-200/40"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`mt-1.5 text-[10px] font-medium uppercase tracking-wider sm:text-[11px] ${
                        message.isUser ? "text-sky-100/85" : "text-slate-500"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-slate-200/90 bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200/30">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-ocean-500/90" />
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-ocean-500/90"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-ocean-500/90"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <footer className="shrink-0 border-t border-slate-200/80 bg-white px-3 py-3 sm:px-4 sm:py-3.5">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <label htmlFor="chatbot-input" className="sr-only">
                Message
              </label>
              <input
                id="chatbot-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message…"
                className="min-h-[44px] flex-1 rounded-full border border-slate-200/90 bg-slate-50/90 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-200"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 text-white shadow-md shadow-ocean-600/25 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2.5 text-center text-[11px] leading-snug text-slate-500">
              Need immediate help?{" "}
              <a
                href="mailto:info@oceancyber.net"
                className="font-medium text-ocean-600 underline-offset-2 hover:text-ocean-800 hover:underline"
              >
                info@oceancyber.net
              </a>
            </p>
          </footer>
        </>
      ) : null}
    </div>
  );
}
