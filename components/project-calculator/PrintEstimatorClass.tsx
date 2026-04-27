"use client";

import { useEffect } from "react";

/**
 * Toggles a class on `document.documentElement` so print styles can hide site chrome
 * (header, footer, chat) only on the project cost tool route.
 */
export function PrintEstimatorClass() {
  useEffect(() => {
    document.documentElement.classList.add("app-print-estimator");
    return () => document.documentElement.classList.remove("app-print-estimator");
  }, []);
  return null;
}
