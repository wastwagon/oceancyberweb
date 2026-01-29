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
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    default: "bg-[#25D366] text-white hover:bg-[#20BA5A] shadow-lg hover:shadow-xl",
    outline: "border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-300",
  };

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <MessageCircle className="w-5 h-5" />
      WhatsApp Us
    </a>
  );
}
