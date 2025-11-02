// src/app/(userLayout)/about/page.tsx
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  ShoppingBag,
  Users,
  Store,
  Leaf,
  Shield,
  Rocket,
  Smile,
} from "lucide-react";

export const metadata = {
  title: "About — Dressen",
  description:
    "Learn about Dressen — your premier fashion destination offering trendy, quality clothing for every style and occasion.",
};

function Stat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="border-gray-200">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg grid place-items-center bg-gray-50">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-extrabold tracking-tight">{value}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function ValueCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Card className="border-gray-200 h-full">
      <CardContent className="p-5">
        <div className="w-10 h-10 rounded-lg grid place-items-center bg-gray-50 mb-3">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{text}</p>
      </CardContent>
    </Card>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFF3E9] via-white to-[#FFE4D6]" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-xs tracking-widest text-primary font-semibold">
                ABOUT Dressen
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-secondary">
                Fashion that fits your lifestyle.
              </h1>
              <p className="mt-3 text-gray-600 max-w-2xl">
                Dressen brings you the latest in fashion trends and timeless classics. From casual everyday wear to elegant formal pieces—discover quality clothing that expresses your unique style.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/product-listing">
                  <Button className="w-full sm:w-auto">Shop Now</Button>
                </Link>
                <Link href="/contact-us">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 bg-white">
              <Image
                src="/about1.jpg"
                alt="Fashion collection from Dressen"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <Stat
            icon={<Store className="w-5 h-5 text-primary" />}
            label="Collections"
            value="25+"
          />
          <Stat
            icon={<Package className="w-5 h-5 text-primary" />}
            label="Products"
            value="1500+"
          />
          <Stat
            icon={<Users className="w-5 h-5 text-primary" />}
            label="Happy Customers"
            value="50K+"
          />
          <Stat
            icon={<ShoppingBag className="w-5 h-5 text-primary" />}
            label="Orders Delivered"
            value="200K+"
          />
        </div>
      </section>

      {/* STORY */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">
              Our Story
            </h2>
            <p className="mt-3 text-gray-600">
              Dressen started with a simple belief:{" "}
              <span className="font-semibold text-secondary">
                &ldquo;Fashion should be accessible, stylish, and sustainable.&rdquo;
              </span>{" "}
              From our first boutique to today&rsquo;s online platform, we&rsquo;ve been committed to curating quality clothing that empowers people to express their individuality.
            </p>
            <p className="mt-3 text-gray-600">
              Today, Dressen offers everything from casual everyday essentials to statement pieces for special occasions. We carefully select each item for quality, style, and value, bringing you fashion that fits your lifestyle and budget.
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 bg-white">
              <Image
                src="/about2.jpg"
                alt="Dressen fashion collection and styling"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">
          Our Values
        </h2>
        <p className="text-gray-600 mt-2">
          Four principles guide every collection and every customer experience.
        </p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <ValueCard
            icon={<Shield className="w-5 h-5 text-primary" />}
            title="Quality & Durability"
            text="Premium materials, careful craftsmanship, and lasting construction."
          />
          <ValueCard
            icon={<Leaf className="w-5 h-5 text-primary" />}
            title="Sustainability"
            text="Eco-friendly practices and responsible sourcing for a better future."
          />
          <ValueCard
            icon={<Rocket className="w-5 h-5 text-primary" />}
            title="Fast Delivery"
            text="Quick processing and reliable shipping to your doorstep."
          />
          <ValueCard
            icon={<Smile className="w-5 h-5 text-primary" />}
            title="Style & Comfort"
            text="Trendy designs that don't compromise on comfort and wearability."
          />
        </div>
      </section>

      {/* TIMELINE */}
      {/* <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
          Milestones
        </h2>
        <ul className="mt-4 space-y-4">
          <li className="flex gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#facf35]" />
            <p className="text-gray-700">
              <b>2020:</b> Started with a single street cart serving fresh beverages and snacks.
            </p>
          </li>
          <li className="flex gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#facf35]" />
            <p className="text-gray-700">
              <b>2022:</b> Expanded to multiple locations and launched delivery service.
            </p>
          </li>
          <li className="flex gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#facf35]" />
            <p className="text-gray-700">
              <b>2024:</b> Online ordering platform and expanded menu with specialty items.
            </p>
          </li>
        </ul>
      </section> */}

      {/* TEAM (static/dummy) */}
      {/* <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
          Team
        </h2>
        <p className="text-gray-600 mt-2">
          A passionate team of chefs, baristas, and food enthusiasts dedicated to bringing you the best flavors from our kitchen to your table.
        </p>

        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { name: "Chef Rahman", role: "Head Chef" },
            { name: "Barista Hossain", role: "Beverage Master" },
            { name: "Manager Islam", role: "Operations" },
            { name: "Quality Ahmed", role: "Quality Control" },
          ].map((m) => (
            <Card key={m.name} className="border-gray-200">
              <CardContent className="p-4">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                  <Image
                    src="/mens.png"
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 250px"
                    className="object-contain"
                  />
                </div>
                <div className="mt-3">
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-gray-500">{m.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* FAQ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">
          FAQs
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {[
            {
              q: "What sizes do you offer?",
              a: "We offer a full range of sizes from XS to 3XL for most items. Check individual product pages for specific size charts and availability.",
            },
            {
              q: "Do you offer free shipping?",
              a: "Yes! We offer free shipping on orders over $75. Standard delivery takes 3-7 business days, with express options available.",
            },
            {
              q: "What's your return policy?",
              a: "We accept returns within 30 days of purchase. Items must be unworn with original tags. Free returns for exchanges or store credit.",
            },
            {
              q: "How do I find my perfect fit?",
              a: "Use our detailed size guides on each product page. We also offer virtual fitting tools and customer reviews with fit feedback.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="rounded-xl border border-gray-200 bg-white p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-gray-800">
                {item.q}
              </summary>
              <p className="text-sm text-gray-600 mt-2">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <Card className="border-gray-200 overflow-hidden">
          <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-secondary">
                Ready to upgrade your wardrobe?
              </h3>
              <p className="text-gray-600 mt-1">
                Discover the latest trends, timeless classics, and exclusive deals—find fashion that fits your style and budget.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/deals">
                <Button>View Deals</Button>
              </Link>
              <Link href="/products">
                <Button variant="outline">Shop Now</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}