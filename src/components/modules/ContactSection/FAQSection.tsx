"use client";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Why must I make payment immediately at checkout?",
    answer: "Payments ensure timely processing and order confirmation.",
  },
  {
    question: "What are the benefits of registering?",
    answer:
      "You can track orders, save addresses, and get exclusive offers.",
  },
  {
    question: "Can I edit my personal information?",
    answer:
      "Yes. You can edit your personal information in the 'My Account' section by logging in.",
  },
  {
    question: "Why must I make payment immediately at checkout?",
    answer: "This helps us confirm your order instantly.",
  },
];

const FAQItemComponent: React.FC<FAQItem> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b  border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-gray-900">{question}</span>
        {open ? (
          <Minus size={18} className="text-gray-500" />
        ) : (
          <Plus size={18} className="text-gray-500" />
        )}
      </button>
      {open && <p className="pb-4 text-sm text-gray-600">{answer}</p>}
    </div>
  );
};

const FAQSection: React.FC = () => {
  return (
    <section className="mt-12">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-900">
        Frequently Asked Questions
      </h2>
      <p className="mt-1 text-sm text-gray-600 max-w-2xl">
        Our Frequently Asked Questions section is here to give you quick,
        clear answers to the most common queries about our service.
      </p>

      {/* FAQ Accordion */}
      <div className="mt-6 rounded-lg bg-white  divide-y divide-gray-200">
        {FAQS.map((faq, idx) => (
          <FAQItemComponent key={idx} {...faq} />
        ))}
      </div>

      {/* Contact Box */}
     
    </section>
  );
};

export default FAQSection;
