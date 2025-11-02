"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

type PageData = {
  form: {
    subjectOptions: { value: string; label: string }[];
    newsletterText: string;
    submitButtonText: string;
  };
  contactInfo: {
    address: { text: string; description: string };
    phone: { number: string; note: string };
    email: { address: string; note: string };
    storeHours: { day: string; hours: string }[];
  };
  socialLinks: {
    name: string;
    url: string;
    bgColor: string;
    hoverColor: string;
    icon: "facebook" | "instagram" | "twitter" | "whatsapp";
  }[];
  faqs: { question: string; answer: string }[];
};

const pageData: PageData = {
  form: {
    subjectOptions: [
      { value: "general", label: "General Inquiry" },
      { value: "support", label: "Support" },
      { value: "feedback", label: "Feedback" }
    ],
    newsletterText: "Subscribe to our newsletter for updates and offers",
    submitButtonText: "Send Message"
  },
  contactInfo: {
    address: {
      text: "Address",
      description: "Quis aliquod aliquam. Ut rerum recusandae. Labons voluptatibus. 23196. Quis qui dolore ea."
    },
    phone: {
      number: "532409738646",
      note: "Customer Service: Mon-Fri 9AM-6PM"
    },
    email: {
      address: "contact@marryrose.com",
      note: "We respond within 24 hours"
    },
    storeHours: [
      { day: "Monday - Saturday", hours: "9:00 AM - 8:00 PM" },
      { day: "Sunday", hours: "10:00 AM - 6:00 PM" },
      { day: "Holidays", hours: "10:00 AM - 4:00 PM" }
    ]
  },
  socialLinks: [
    { name: "Facebook", url: "https://facebook.com", bgColor: "#1877F2", hoverColor: "#145dbf", icon: "facebook" },
    { name: "Instagram", url: "https://instagram.com", bgColor: "linear-gradient(to right, #f58529, #dd2a7b, #8134af)", hoverColor: "#dd2a7b", icon: "instagram" },
    { name: "Twitter", url: "https://twitter.com", bgColor: "#1DA1F2", hoverColor: "#1991da", icon: "twitter" },
    { name: "WhatsApp", url: "https://wa.me/1234567890", bgColor: "#25D366", hoverColor: "#1da851", icon: "whatsapp" }
  ],
  faqs: [
    {
      question: "How can I track my order?",
      answer: "You'll receive a tracking number via email once your order ships. Use this number on our tracking page."
    },
    {
      question: "Do you offer gift cards?",
      answer: "Yes! Digital gift cards are available in various amounts and never expire."
    },
    {
      question: "What's your return policy?",
      answer: "We offer 30-day returns for unworn items with original tags. Visit our returns page for details."
    },
    {
      question: "How do I change my order?",
      answer: "Contact us within 1 hour of placing your order, and we'll do our best to make changes."
    }
  ]
};

const iconMap = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  whatsapp: MessageCircle
};

export default function ContactPage() {
  const { form, contactInfo, socialLinks, faqs } = pageData;

  return (
    <div className="space-y-3">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        
        {/* Left: Form */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input placeholder="John" className="mt-2" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input placeholder="Doe" className="mt-2" />
              </div>
            </div>
            <div>
              <Label>Email Address</Label>
              <Input type="email" className="mt-2" placeholder="john.doe@example.com" />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input className="mt-2" placeholder="+1 (555) 123-4567" />
            </div>
            <div>
              <Label>Subject</Label>
              <Select>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder={form.subjectOptions[0].label} />
                </SelectTrigger>
                <SelectContent>
                  {form.subjectOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Message</Label>
              <Textarea className="mt-2 h-[120px]" placeholder="Please describe your inquiry..." />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="newsletter" />
              <Label htmlFor="newsletter" className="text-sm text-gray-600">
                {form.newsletterText}
              </Label>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 w-full">{form.submitButtonText}</Button>
          </form>
        </Card>

        {/* Right: Contact Info */}
        <div className="space-y-4">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
            <CardContent className="space-y-6 p-0">
              
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-3 rounded-lg flex items-center justify-center">
                  <MapPin className="text-orange-500 w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">{contactInfo.address.text}</p>
                  <p className="text-sm text-gray-600">{contactInfo.address.description}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-3 rounded-lg flex items-center justify-center">
                  <Phone className="text-orange-500 w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-gray-600">{contactInfo.phone.number}</p>
                  <p className="text-xs text-gray-500">{contactInfo.phone.note}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-3 rounded-lg flex items-center justify-center">
                  <Mail className="text-orange-500 w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">{contactInfo.email.address}</p>
                  <p className="text-xs text-gray-500">{contactInfo.email.note}</p>
                </div>
              </div>

              {/* Store Hours */}
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-3 rounded-lg flex items-center justify-center">
                  <Clock className="text-orange-500 w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Store Hours</p>
                  {contactInfo.storeHours.map((sh, i) => (
                    <p key={i} className="text-xs text-gray-600">
                      {sh.day}: {sh.hours}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold">Connect With Us</h2>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, i) => {
                const Icon = iconMap[link.icon];
                return (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-[#2e2e2e]"
                      style={{
                        background: link.bgColor,
                        transition: "background-color 0.2s ease"
                      }}
                    >
                      <Icon className="w-4 h-4" /> {link.name}
                    </Button>
                  </a>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Answers */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Quick Answers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i}>
              <p className="font-medium">{faq.question}</p>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
