
"use client"
import FAQPage from "@/components/Faqs/Faqs"
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function Page() {
  useScrollToTop();
  return <FAQPage />
}
