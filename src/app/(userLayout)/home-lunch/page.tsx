"use client";


import FAQSection from "@/components/Homecategory/AccordianPage";
import BannerPage from "@/components/Homecategory/Banner";
import CardSection from "@/components/Homecategory/CardSection";
import ContactForm from "@/components/Homecategory/ContactForm";
import LogoPage from "@/components/Homecategory/LogoPage";
import MonetizePage from "@/components/Homecategory/Monetize";
import SellerHero from "@/components/Homecategory/SellerHero";
import TestimonialsSection from "@/components/Homecategory/TestimonialsSection";
import { WhySellSection } from "@/components/Homecategory/WhySellSection";


export default function Homelucnh() {
  return (
    <div>
        <BannerPage />
        <LogoPage />
        <CardSection />
        <TestimonialsSection />
        <WhySellSection />
        <MonetizePage />
        <FAQSection  />
        <ContactForm />
        <SellerHero />
    </div>
  )
}
