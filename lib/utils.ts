import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  // Format Ghana phone numbers
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("233")) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith("0")) {
    return `+233${cleaned.slice(1)}`;
  }
  return phone;
}

export function formatWhatsAppLink(phone: string, message?: string): string {
  const formattedPhone = formatPhoneNumber(phone);
  const encodedMessage = message
    ? encodeURIComponent(message)
    : encodeURIComponent("Hello! I'm interested in your services.");
  return `https://wa.me/${formattedPhone.replace("+", "")}?text=${encodedMessage}`;
}
