"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  Heart,
  Share2,
  ShieldCheck,
  Lock,
  CreditCard,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function WebsiteInfoPage() {
  // 🔹 Header Data
  const headerData = {
    title: "Marny Rose Official Website",
    url: "www.marnyrose.com",
    websiteLink: "https://www.marnyrose.com",
    previewText: "Website Preview",
  };

  // 🔹 Feature Cards Data
  const featureCards = [
    { icon: <Star className="text-orange-500 w-8 h-8" />, title: "Premium Experience", desc: "Seamless shopping experience" },
    { icon: <Heart className="text-orange-500 w-8 h-8" />, title: "Wishlist & Favorites", desc: "Save your favorite items" },
    { icon: <Share2 className="text-orange-500 w-8 h-8" />, title: "Social Integration", desc: "Share with friends" },
  ];

  // 🔹 Technical Information
  const techInfo = [
    { icon: <ShieldCheck className="w-5 h-5" />, title: "SSL Secured", desc: "256-bit encryption" },
    { icon: <Lock className="w-5 h-5" />, title: "GDPR Compliant", desc: "Data protection" },
    { icon: <CreditCard className="w-5 h-5" />, title: "PCI DSS Certified", desc: "Secure payments" },
    { icon: <Clock className="w-5 h-5" />, title: "99.9% Uptime", desc: "Always available" },
  ];

  // 🔹 Website Features
  const websiteFeatures = [
    { title: "Complete Product Catalog", description: "Browse our entire collection with detailed photos and descriptions" },
    { title: "Advanced Search & Filters", description: "Find exactly what you're looking for with powerful search tools" },
    { title: "Secure Checkout", description: "Multiple payment options with SSL encryption" },
    { title: "User Accounts", description: "Track orders, save favorites, and manage your preferences" },
    { title: "Mobile Responsive", description: "Perfect shopping experience on any device" },
  ];

  // 🔹 Benefits
  const benefits = [
    { title: "Early Access Sales", desc: "Website members get 24-hour early access to all sales and new arrivals", active: true },
    { title: "Exclusive Online Discounts", desc: "Special promo codes and discounts available only on our website", active: true },
    { title: "Free Virtual Styling", desc: "Book a free virtual styling session with our fashion experts", active: false },
    { title: "Loyalty Rewards", desc: "Earn points with every purchase and redeem for exclusive rewards", active: true },
  ];

  return (
    <div className="w-full mx-auto space-y-3">
      {/* Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{headerData.title}</h1>
            <p className="text-sm text-gray-500">{headerData.url}</p>
          </div>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-[#2e2e2e] flex items-center gap-2"
            onClick={() => window.open(headerData.websiteLink, "_blank")}
          >
            <ExternalLink className="w-4 h-4" />
            Visit Website
          </Button>
        </div>

        {/* Website Preview */}
        <div className="mt-6 border border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center text-gray-400">
          {headerData.previewText}
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {featureCards.map((item, idx) => (
            <FeatureCard key={idx} icon={item.icon} title={item.title} desc={item.desc} />
          ))}
        </div>
      </Card>

      {/* Technical Information */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Technical Information</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {techInfo.map((item, idx) => (
            <TechBadge key={idx} icon={item.icon} title={item.title} desc={item.desc} />
          ))}
        </div>
      </Card>

      {/* Website Features */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Website Features</h2>
        <ul className="space-y-5">
          {websiteFeatures.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-100 mt-1">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              </span>
              <div>
                <p className="font-semibold text-gray-900">{feature.title}</p>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Exclusive Online Benefits */}
      <div className="border rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-bold">Exclusive Online Benefits</h2>
        {benefits.map((benefit, idx) => (
          <BenefitItem key={idx} title={benefit.title} desc={benefit.desc} active={benefit.active} />
        ))}
      </div>

      {/* CTA */}
      <Card className="p-8 text-center border rounded-xl">
        <h2 className="text-lg font-bold mb-2">Ready to Shop Online?</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
          Visit our website for the complete Marny Rose experience with exclusive online features and benefits.
        </p>
        <div className="flex justify-center gap-3">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-[#2e2e2e] flex items-center gap-2"
            onClick={() => window.open(headerData.websiteLink, "_blank")}
          >
            <ExternalLink className="w-4 h-4" />
            Visit Website
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            Download App
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* Feature Card Component */
function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-center text-center">
      {icon}
      <p className="mt-2 text-[16px] font-bold">{title}</p>
      <p className="text-[16px] text-gray-500">{desc}</p>
    </div>
  );
}

/* Tech Badge Component */
function TechBadge({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-gray-100 rounded-lg p-3 flex flex-col items-center text-center">
      {icon}
      <p className="mt-1 font-bold text-sm">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
}

/* Benefit Item Component */
type BenefitItemProps = {
  title: string;
  desc: string;
  active?: boolean;
};

function BenefitItem({ title, desc, active = true }: BenefitItemProps) {
  return (
    <div className="rounded-lg p-4 border bg-white">
      <p className={`font-medium mb-1 ${active ? "text-orange-500" : "text-gray-400"}`}>{title}</p>
      <p className={`text-sm ${active ? "text-gray-600" : "text-gray-400"}`}>{desc}</p>
    </div>
  );
}
