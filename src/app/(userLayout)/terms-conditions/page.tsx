"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useGetAllTermsQuery } from "@/redux/featured/terms/termsApi";

type Section = {
  _id: string;
  name: string;
  description: string;
  type?: string;
  issuedBy?: string;
  isApproved?: boolean;
};

export default function TermsAndConditions() {
  const { data: termsData, error, isLoading } = useGetAllTermsQuery();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // ✅ console log data
  useEffect(() => {
    if (termsData && Array.isArray(termsData) && termsData.length > 0 && !activeSection) {
      setActiveSection(termsData[0]._id); // প্রথম section auto select
    }

  }, [termsData, error, activeSection]);

  const handleSectionClick = (id: string) => setActiveSection(id);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setSubmitMessage("Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitMessage("Thank you! We'll get back to you soon.");
    setEmail("");
  };

  useEffect(() => {
    if (submitMessage) {
      const timer = setTimeout(() => setSubmitMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitMessage]);

  if (isLoading) return <p className="text-center py-8">Loading terms...</p>;
  if (error) return <p className="text-center text-red-600 py-8">Failed to load terms.</p>;

  const sections: Section[] = Array.isArray(termsData) ? termsData : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center py-8 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            By using our site, you agree to comply with and be bound by these Terms and Conditions.
            <br className="hidden sm:block" />
            If you do not agree, please do not use our website.
          </p>
        </div>

        {/* Sidebar + Main Content */}
        <div className="flex flex-1 flex-col lg:flex-row gap-6 lg:gap-12 px-4 sm:px-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <nav className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-1">
              {sections.map((section) => {
                const active = activeSection === section._id;
                return (
                  <button
                    key={section._id}
                    onClick={() => handleSectionClick(section._id)}
                    title={section.name}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "block w-auto lg:w-full flex-shrink-0 text-left px-5 py-3 text-sm sm:text-base rounded-full transition-all duration-200 border truncate",
                      active
                        ? "font-medium text-[#2e2e2e] bg-black border-black shadow-sm"
                        : "text-gray-700 bg-white/60 border-gray-200 hover:bg-black hover:text-[#2e2e2e] hover:border-black",
                      "focus:outline-none focus:ring-2 focus:ring-black/30",
                    ].join(" ")}
                  >
                    {section.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0">
            <div className="flex-1 bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-6 sm:p-8 overflow-auto transition-all duration-300">
              {activeSection ? (
                <>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                    {sections.find((sec) => sec._id === activeSection)?.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {sections.find((sec) => sec._id === activeSection)?.description}
                  </p>
                </>
              ) : (
                <p className="text-gray-600">Select a section to view details.</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Email Section */}
        <div className="mt-12 sm:mt-16 mx-auto text-center flex flex-col items-center w-full max-w-[439px] h-[314.4px] gap-[15.4px] pt-12 pr-8 pb-8 pl-8 rounded-[16px] opacity-100 rotate-0 bg-white/70 border border-gray-200 backdrop-blur">
          <h2 className="text-lg sm:text-xl font-medium text-gray-900">
            Have any other questions?
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Feel free to reach out to us for any questions or concerns.
          </p>

          {/* form */}
          <form onSubmit={handleEmailSubmit} className="w-full mt-auto flex flex-col justify-center">
            <Input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-100 border-gray-200 text-sm sm:text-base transition-all duration-200 focus:bg-white rounded-full focus:border-black focus:ring-2 focus:ring-black/15 mb-3"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-black hover:bg-black text-[#2e2e2e] px-6 py-3 text-sm sm:text-base font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-black/30 mb-2"
            >
              {isSubmitting ? "SENDING..." : "SEND"}
            </Button>
          </form>

          {submitMessage && (
            <p className={`text-sm sm:text-base transition-all duration-300 ${submitMessage.includes("Thank you") ? "text-green-600" : "text-red-600"}`}>
              {submitMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
