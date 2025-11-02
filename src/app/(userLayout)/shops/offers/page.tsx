"use client";

import { Button } from "@/components/ui/button";

// Button style presets
const buttonStyles = {
  filled: "bg-orange-500 text-[#2e2e2e] hover:bg-orange-600",
  outline: "bg-[#FAFAFA] border border-gray-300 text-gray-900 hover:bg-gray-100",
} as const;

// Header style presets based on styleType


type Offer = {
  title: string;
  subtitle: string;
  mainDescription: string;
  details: string[];
  buttonText: string;
  styleType: keyof typeof buttonStyles;
};

const offers: Offer[] = [
  {
    title: "20% OFF",
    subtitle: "First Order Discount",
    mainDescription:
      "Get 20% discount on your first purchase. Use code: WELCOME20",
    details: [
      "Valid for new customers only",
      "Minimum order $30",
      "Expires: Dec 31, 2024",
    ],
    buttonText: "Use Code: WELCOME20",
    styleType: "filled",
  },
  {
    title: "FREE SHIPPING",
    subtitle: "Orders Over $50",
    mainDescription:
      "Enjoy free shipping on all orders over $50. No code needed.",
    details: ["Automatic at checkout", "Worldwide delivery", "3-7 business days"],
    buttonText: "Shop Now",
    styleType: "outline",
  },
  {
    title: "BUY 2 GET 1",
    subtitle: "Free Item Offer",
    mainDescription:
      "Buy any 2 items and get the lowest priced item absolutely free.",
    details: [
      "Mix and match any items",
      "Lowest priced item free",
      "Limited time offer",
    ],
    buttonText: "Shop Collection",
    styleType: "filled",
  },
  {
    title: "15% OFF",
    subtitle: "Student Discount",
    mainDescription:
      "Students get 15% off with valid student ID verification.",
    details: ["Valid student ID required", "Renewable annually"],
    buttonText: "Verify Student Status",
    styleType: "outline",
  },
  {
    title: "FLASH SALE",
    subtitle: "30% Off Selected Items",
    mainDescription:
      "Limited time flash sale on selected fashion items. Hurry while stocks last!",
    details: ["Selected items only", "While stocks last", "Ends: Tomorrow 11:59 PM"],
    buttonText: "Shop Flash Sale",
    styleType: "filled",
  },
  {
    title: "VIP MEMBERS",
    subtitle: "Exclusive Benefits",
    mainDescription:
      "Join our VIP program for exclusive discounts and early access to sales.",
    details: ["10% off all purchases", "Early sale access", "Birthday rewards"],
    buttonText: "Join VIP Program",
    styleType: "outline",
  },
];

export default function OffersPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {offers.map((offer, index) => (
        <div
          key={index}
          className="border rounded-xl h-[350px] p-4 flex flex-col justify-between shadow-sm bg-white"
        >
          <div>
            {/* Header */}
            <div
              className="p-4 rounded-2xl bg-[#fff0eb]"
            >
              <div
                className="inline-block text-2xl font-bold  text-[#FF6933]
                "
              >
                {offer.title}
              </div>
              <h3 className="mt-2 font-bold text-lg text-gray-900">
                {offer.subtitle}
              </h3>
            </div>

            {/* Main description */}
            <p className="mt-3 text-[#64748B] text-lg">{offer.mainDescription}</p>

            {/* Details list */}
            {offer.details.length > 0 && (
            
            <ul className="mt-2 space-y-1 text-gray-600 text-sm list-disc list-inside">
                {offer.details.map((line, i) => (
                  <li className="text-sm mt-1" key={i}>{line}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Button */}
          <Button
            className={`mt-4 w-full rounded-lg ${buttonStyles[offer.styleType]}`}
          >
            {offer.buttonText}
          </Button>
        </div>
      ))}
    </div>
  );
}
