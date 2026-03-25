"use client";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, MessageSquare, X, Minimize2, Maximize2 } from "lucide-react";

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
      text: "Hello! 👋 Welcome to OceanCyber. How can I help you today?",
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
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to help you with that! Let me connect you with our team.",
        "Great question! Our team specializes in web and mobile development solutions.",
        "Thank you for your inquiry! We offer comprehensive IT consulting services.",
        "I can help guide you to the right solution. Let me get you more information.",
        "Our team is ready to assist you with your technology needs!",
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 group p-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full shadow-2xl shadow-teal-500/50 hover:scale-110 hover:shadow-teal-400/70 transition-all duration-300 border border-teal-400/30 backdrop-blur-sm animate-pulse"
        aria-label="Open chat"
      >
        <MessageSquare className="w-6 h-6 group-hover:animate-bounce" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 w-96 bg-white/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-2xl shadow-cyan-500/30 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">OceanCyber Assistant</h3>
              <p className="text-xs opacity-80">Always here to help</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      {!isMinimized && (
        <>
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.isUser
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                      : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isUser ? "text-cyan-100" : "text-gray-500"}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Need immediate help? Contact us at{" "}
              <a href="mailto:info@oceancyber.net" className="text-cyan-600 hover:underline">
                info@oceancyber.net
              </a>
            </p>
          </div>
        </>
      )}
    </div>
  );
}