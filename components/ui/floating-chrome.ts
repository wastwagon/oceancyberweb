/** Shared positioning for fixed chat + scroll-to-top controls. */
export const floatingChrome = {
  /** Bottom-right — chat / WhatsApp assistance. */
  chat: "fixed z-[150] max-md:bottom-[calc(env(safe-area-inset-bottom)+4.75rem)] max-md:right-4 bottom-6 right-6",
  /** Bottom-left — back to top, opposite the chat launcher. */
  scrollToTop:
    "fixed z-[150] max-md:bottom-[calc(env(safe-area-inset-bottom)+4.75rem)] max-md:left-4 bottom-6 left-6",
  fab:
    "flex h-14 w-14 items-center justify-center rounded-full border border-sa-primary/30 bg-sa-bg text-sa-primary shadow-2xl transition-all hover:bg-sa-primary hover:text-sa-bg active:scale-[0.95]",
} as const;
