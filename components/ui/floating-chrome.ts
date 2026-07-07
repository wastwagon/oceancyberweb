/** Shared positioning for fixed chat + scroll-to-top controls. */
export const floatingChrome = {
  /** Bottom-right — chat / WhatsApp assistance. */
  chat: "fixed z-[150] max-md:bottom-[var(--sa-mobile-fab-offset)] max-md:right-[max(1rem,env(safe-area-inset-right))] bottom-6 right-6",
  /** Bottom-left — back to top, opposite the chat launcher. */
  scrollToTop:
    "fixed z-[150] max-md:bottom-[var(--sa-mobile-fab-offset)] max-md:left-[max(1rem,env(safe-area-inset-left))] bottom-6 left-6",
  fab:
    "sa-pressable flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#1c1c1e]/90 text-sa-primary shadow-2xl backdrop-blur-xl backdrop-saturate-150 transition-all active:scale-[0.94] md:hover:border-sa-primary/40 md:hover:bg-sa-primary md:hover:text-sa-bg",
} as const;
