"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

const termsContent = {
    acceptance: { title: "Acceptance of Terms", content: ["By accessing and using this website, you accept...", "If you do not agree...", "These terms constitute the entire agreement...", "Any modifications must be agreed upon in writing."] },
    shipping: { title: "Shipping and Delivery", content: ["We offer various shipping options...", "Standard shipping takes 3-5 business days...", "Express shipping available at extra cost...", "International shipping may take 7-14 business days."] },
    product: { title: "Product Information", content: ["We strive to provide accurate product descriptions...", "Product images are illustrative...", "Specifications may be modified without notice...", "Products are subject to availability."] },
    order: { title: "Order Process", content: ["Orders processed within 1-2 business days...", "Confirmation email with tracking sent after shipping...", "Right to refuse or cancel orders...", "Order modifications possible within 2 hours."] },
    pricing: { title: "Pricing and Payment", content: ["All prices listed in USD...", "We accept credit cards, PayPal...", "Payment must be received in full...", "Taxes and shipping fees calculated at checkout."] },
    returns: { title: "Returns and Refunds", content: ["Items may be returned within 30 days...", "Return shipping costs are customer responsibility...", "Refunds processed within 5-7 business days...", "Custom items not eligible unless defective."] },
    intellectual: { title: "Intellectual Property", content: ["All content protected by copyright...", "No reproduction without permission...", "Trademarks/logos need consent...", "User content remains property of users."] },
    changes: { title: "Changes to Terms", content: ["We may modify terms at any time...", "Changes effective immediately...", "Continued use = acceptance...", "Review periodically for updates."] },
    contact: { title: "Contact Us", content: ["For questions, contact customer service...", "Available Mon-Fri, 9 AM - 6 PM EST...", "Reach via email, phone, or form...", "Responses within 24 hours on business days."] },
}

type SectionKey = keyof typeof termsContent

export default function TermsAndConditions() {
    const [activeSection, setActiveSection] = useState<SectionKey>("acceptance")
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState("")

    const handleSectionClick = (sectionId: SectionKey) => setActiveSection(sectionId)

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !email.includes("@")) {
            setSubmitMessage("Please enter a valid email address")
            return
        }
        setIsSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsSubmitting(false)
        setSubmitMessage("Thank you! We'll get back to you soon.")
        setEmail("")
    }

    useEffect(() => {
        if (submitMessage) {
            const timer = setTimeout(() => setSubmitMessage(""), 3000)
            return () => clearTimeout(timer)
        }
    }, [submitMessage])

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

                {/* Sidebar + Main Content (same wrapper) */}
                <div className="flex flex-1 flex-col lg:flex-row gap-6 lg:gap-12 px-4 sm:px-6">
                    {/* Sidebar */}
                    <div className="w-full lg:w-64 flex-shrink-0 mb-6">
                        <nav className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible">
                            {Object.entries(termsContent).map(([key, section]) => {
                                const active = activeSection === (key as SectionKey)
                                return (
                                    <button
                                        key={key}
                                        onClick={() => handleSectionClick(key as SectionKey)}
                                        title={section.title}
                                        aria-current={active ? "page" : undefined}
                                        className={[
                                            "block w-auto lg:w-full flex-shrink-0 text-left px-5 py-3 text-sm sm:text-base rounded-full transition-all duration-200 border truncate",
                                            active
                                                ? "font-medium text-[#2e2e2e] bg-black border-black shadow-sm"
                                                : "text-gray-700 bg-white/60 border-gray-200 hover:bg-black hover:text-[#2e2e2e] hover:border-black",
                                            "focus:outline-none focus:ring-2 focus:ring-black/30",
                                        ].join(" ")}
                                    >
                                        {section.title}
                                    </button>
                                )
                            })}
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0 ">
                        <div className="flex-1 bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-6 sm:p-8 overflow-auto transition-all duration-300">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                                {termsContent[activeSection].title}
                            </h2>
                            <div className="space-y-3 sm:space-y-4">
                                {termsContent[activeSection].content.map((item, index) => (
                                    <div
                                        key={index}
                                        className="opacity-0 animate-in fade-in duration-300"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">• {item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Email Section */}
                <div
                    className="
    mt-12 sm:mt-16
    mx-auto text-center
    flex flex-col items-center
    w-full max-w-[439px] h-[314.4px]
    gap-[15.4px]
    pt-12 pr-8 pb-8 pl-8
    rounded-[16px]
    opacity-100
    rotate-0
    bg-white/70 border border-gray-200 backdrop-blur
  "
                >
                    <h2 className="text-lg sm:text-xl font-medium text-gray-900">
                        Have any other questions?
                    </h2>

                    <p className="text-sm sm:text-base text-gray-600">
                        Feel free to reach out to us for any questions or concerns.
                    </p>

                    {/* form pinned to bottom */}
                    <form
                        onSubmit={handleEmailSubmit}
                        className="w-full mt-auto flex flex-col justify-center"
                    >
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
                        <p
                            className={`text-sm sm:text-base transition-all duration-300 ${submitMessage.includes("Thank you") ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {submitMessage}
                        </p>
                    )}
                </div>


            </div>
        </div>
    )
}
