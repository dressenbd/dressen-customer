"use client";

import { useEffect } from "react";

export const useScrollToTop = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 0);
  }, []);
};