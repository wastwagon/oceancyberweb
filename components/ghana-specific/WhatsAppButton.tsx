"use client";

import { MessageCircle } from "lucide-react";
import { formatWhatsAppLink } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  message?: string;
}

export function WhatsAppButton({
  variant = "default",
  size = "md",
  className,
  message,
}: WhatsAppButtonProps) {
  const phoneNumber = "+233242565695";
  const whatsappLink = formatWhatsAppLink(phoneNumber, message);

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    default: "bg-sa-primary text-sa-bg hover:bg-sa-primary/90 shadow-lg shadow-sa-primary/20",
    outline:
      "border-2 border-sa-primary/50 bg-transparent text-sa-primary hover:border-sa-primary hover:bg-sa-primary/10",
  };

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading font-bold uppercase tracking-widest transition-all duration-300 active:scale-95",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <MessageCircle className="w-5 h-5 animate-pulse" />
      <span>WhatsApp Us</span>
    </a>
  );
}
