"use client";

import Image from "next/image";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGetSettingsQuery } from "@/redux/featured/settings/settingsApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

// Type-safe slide interface
type Slide = {
  _id: string;
  imageUrl: string;
  alt: string;
  href?: string;
};

const FALLBACK: Slide[] = [
  { 
    _id: "f1", 
    imageUrl: "/about1.jpg",
    alt: "Dressen Banner", 
    href: "/products/footwear" 
  },
  { 
    _id: "f2", 
    imageUrl: "/about2.jpg",
    alt: "Dressen Banner", 
    href: "/products/new" 
  },
];


export default function BannerSlider() {
  // Fetch settings from backend
  const { data: settings, isLoading, isError, error } = useGetSettingsQuery();

  
  const [failedApiImages, setFailedApiImages] = useState<Set<string>>(new Set());
  
  // Show API images if available, otherwise fallback
  const slides: Slide[] = useMemo(() => {
    if (settings?.sliderImages && settings.sliderImages.length > 0) {
      // Filter out failed API images
      const validApiImages = settings.sliderImages.filter(img => !failedApiImages.has(img));
      
      if (validApiImages.length > 0) {
        return validApiImages.map((imageUrl, index) => ({
          _id: `slide-${index}`,
          imageUrl,
          alt: `Banner ${index + 1}`,
          href: "/product-listing"
        }));
      }
    }
    return FALLBACK;
  }, [settings, failedApiImages]);

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animationState, setAnimationState] = useState<"in" | "out" | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [prefersReducedMotion, setPRM] = useState(false);


  // Handle prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPRM(mq.matches);

    const onChange = () => setPRM(mq.matches);

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
    } else if (typeof mq.addListener === "function") {
      mq.addListener(onChange);
    }

    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", onChange);
      } else if (typeof mq.removeListener === "function") {
        mq.removeListener(onChange);
      }
    };
  }, []);

  // Auto-rotate slides with flip animation
  useEffect(() => {
    if (prefersReducedMotion || paused || slides.length <= 1) return;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setAnimationState("out");
      setTimeout(() => {
        setIdx((p) => (p + 1) % slides.length);
        setAnimationState("in");
      }, 500); // Match CSS animation duration
    }, 2000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [prefersReducedMotion, paused, slides.length]);

  // Pause on blur, resume on focus
  useEffect(() => {
    const onBlur = () => setPaused(true);
    const onFocus = () => setPaused(false);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const err = error as FetchBaseQueryError | SerializedError | undefined;

  return (
    <div
      className="relative mx-auto w-full lg:w-[1000px] h-44 sm:h-56 md:h-64 lg:h-80 xl:h-96 rounded-lg overflow-hidden border"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style jsx>{`
        @keyframes flipIn {
          0% {
            transform: translateX(100%) rotateY(90deg);
            opacity: 0;
          }
          100% {
            transform: translateX(0) rotateY(0deg);
            opacity: 1;
          }
        }
        @keyframes flipOut {
          0% {
            transform: translateX(0) rotateY(0deg);
            opacity: 1;
          }
          100% {
            transform: translateX(-100%) rotateY(-90deg);
            opacity: 0;
          }
        }
        .slide-in {
          animation: flipIn 0.5s ease-out forwards;
        }
        .slide-out {
          animation: flipOut 0.5s ease-out forwards;
        }
      `}</style>

      {isLoading && <div className="absolute inset-0 animate-pulse bg-neutral" />}

      {slides.map((s, i) => {
        const isActive = i === idx;
        const animationClass =
          isActive && !prefersReducedMotion
            ? animationState === "in"
              ? "slide-in"
              : animationState === "out"
              ? "slide-out"
              : ""
            : isActive
            ? "opacity-100"
            : "opacity-0";

        // Skip rendering if imageUrl is invalid
        if (!s.imageUrl || s.imageUrl === '"' || s.imageUrl.includes('"')) {
          return null;
        }

        const imgEl = (
          <Image
            key={s._id}
            src={s.imageUrl}
            alt={s.alt || "Banner"}
            fill
            priority={i === 0}
            className={`object-cover absolute inset-0 transition-opacity duration-500 ${animationClass}`}
            sizes="(min-width:1280px) 1000px, 100vw"
            unoptimized
            onError={() => {
              // Mark API image as failed, will trigger fallback
              if (settings && settings.sliderImages && settings.sliderImages.includes(s.imageUrl)) {
                setFailedApiImages(prev => new Set(prev).add(s.imageUrl));
              }
            }}
          />
        );

        return imgEl;
      })}

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s._id}
            onClick={() => {
              setAnimationState("out");
              setTimeout(() => {
                setIdx(i);
                setAnimationState("in");
              }, 500);
            }}
            aria-label={`slide ${i + 1}`}
            className={`h-2 w-2 rounded-full ${i === idx ? "bg-accent" : "bg-accent/60"}`}
          />
        ))}
      </div>

      {isError && (
        <span className="sr-only">
          Failed to load slides. {(err && "status" in err && err.status) || ""}
        </span>
      )}
    </div>
  );
}