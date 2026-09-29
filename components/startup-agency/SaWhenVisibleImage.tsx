"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

type SaWhenVisibleImageProps = ImageProps & {
  alt: string;
};

/**
 * Below-fold photos stay out of the first network race. The box is reserved
 * by the parent, so revealing the file does not shift the headline.
 */
export function SaWhenVisibleImage({ alt, ...props }: SaWhenVisibleImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "160px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {visible ? <Image alt={alt} {...props} /> : null}
    </div>
  );
}
