// components/faqs/FAQPage.tsx
"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const faqData = [
  {
    question: "Why must I make payment immediately at checkout?",
    answer:
      "Immediate payment ensures your order is processed quickly and secures your items in our inventory.",
  },
  {
    question: "Is your website secure?",
    answer:
      "Yes, our website uses SSL encryption and secure payment processing to protect your information.",
  },
  {
    question: "When will my order ship?",
    answer:
      "Orders typically ship within 1-2 business days after payment confirmation.",
  },
  {
    question: "How do I make payments using paypal? How does it work?",
    answer:
      "Select PayPal at checkout, log into your PayPal account, and confirm the payment. It's secure and instant.",
  },
  {
    question: "How much do deliveries cost?",
    answer:
      "Delivery costs vary by location and order size. You'll see exact shipping costs at checkout.",
  },
  {
    question: "How can I contact you?",
    answer:
      "You can reach us through our contact form, email, or phone number listed on our contact page.",
  },
  {
    question: "I forgot my password, how do I reset it?",
    answer:
      "Click 'Forgot Password' on the login page and follow the instructions sent to your email.",
  },
  {
    question: "What are the benefits of registering?",
    answer:
      "Registered users enjoy faster checkout, order tracking, exclusive offers, and saved preferences.",
  },
  {
    question: "Can I edit my personal information?",
    answer:
      "Yes, you can edit your personal information in the 'My Account' section by logging in.",
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([8]);
  const [email, setEmail] = useState("");

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div className=" px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-foreground mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Our Frequently Asked Questions section is here to give you quick
          <br />
          answers to the most common queries about our service.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-1 mb-16">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm font-medium text-foreground pr-4">
                {item.question}
              </span>
              {openItems.includes(index) ? (
                <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Have any other questions ?
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          Don&apos;t hesitate to send us an email with your
          <br />
          enquiry or statement of
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
          <Input
            type="email"
            placeholder="What's on your Mind"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 text-sm"
            required
          />
          <Button
            type="submit"
            className="bg-foreground text-background hover:bg-foreground/90 px-6"
          >
            Send Us
          </Button>
        </form>
      </div>
    </div>
  );
}
