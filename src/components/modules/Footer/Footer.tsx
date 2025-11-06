"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useGetSettingsQuery } from "@/redux/featured/settings/settingsApi";
const footerLinks = [
  {
    title: "About",
    links: [
      { label: "FAQ", href: "/faqs-page" },
      { label: "Privacy Policy", href: "/privacy-trust" },
      { label: "Track Your Order", href: "/tracking-order" },
      "Search",
      "Shop",
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Shop",
    links: ["Product Single", "Women", "Return & Exchange"],
  },
  {
    title: "Our Information",
    links: ["Privacy Policy Update", "Single Post", "Sports"],
  },
];

const Footer = () => {
  const { data: settings } = useGetSettingsQuery();
  
  return (
    <footer className="bg-neutral ">
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Logo & Social */}
          <div className="col-span-2">
            <div className="relative w-40 h-16">
              <Image 
                src={settings?.logo || "/logo.png"} 
                alt="logo" 
                fill 
                className="object-contain"
              />
            </div>
            <p className="mt-4">
              Connect with our social <br /> Media Platform
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              {settings?.contactAndSocial?.facebookUrl?.[0] && (
                <a href={settings.contactAndSocial.facebookUrl[0]} target="_blank" rel="noopener noreferrer">
                  <Image src="/fb.png" alt="Facebook" width={24} height={24} />
                </a>
              )}
              {settings?.contactAndSocial?.instagramUrl?.[0] && (
                <a href={settings.contactAndSocial.instagramUrl[0]} target="_blank" rel="noopener noreferrer">
                  <Image src="/insta.png" alt="Instagram" width={24} height={24} />
                </a>
              )}
              {settings?.contactAndSocial?.whatsappLink?.[0] && (
                <a href={settings.contactAndSocial.whatsappLink[0]} target="_blank" rel="noopener noreferrer">
                  <Image src="/ld.png" alt="WhatsApp" width={24} height={24} />
                </a>
              )}
            </div>

            {/* Store Buttons */}
            <div className="flex space-x-3 mt-6">
              <Image
                src="/appstore.png"
                alt="App Store"
                width={130}
                height={40}
              />
              <Image
                src="/googleplay.png"
                alt="Google Play"
                width={130}
                height={40}
              />
            </div>
          </div>

          {/* Footer Sections */}
          {footerLinks.map(({ title, links }, i) => (
            <div key={i}>
              <h3 className="font-semibold xl:font-bold mb-3">{title}</h3>
              <ul className="space-y-2 text-sm">
                {title === "Contact" ? (
                  <>
                    {settings?.contactAndSocial?.email && (
                      <li>
                        <a href={`mailto:${settings.contactAndSocial.email}`}>
                          {settings.contactAndSocial.email}
                        </a>
                      </li>
                    )}
                    {settings?.contactAndSocial?.phone && (
                      <li>
                        <a href={`tel:${settings.contactAndSocial.phone}`}>
                          Call us: {settings.contactAndSocial.phone}
                        </a>
                      </li>
                    )}
                    {settings?.contactAndSocial?.address && (
                      <li>{settings.contactAndSocial.address}</li>
                    )}
                    {links.map((link, j) =>
                      typeof link === "string" ? (
                        <li key={j}>
                          <a href="#">{link}</a>
                        </li>
                      ) : (
                        <li key={j}>
                          <Link href={link.href}>{link.label}</Link>
                        </li>
                      )
                    )}
                  </>
                ) : (
                  links.map((link, j) =>
                    typeof link === "string" ? (
                      <li key={j}>
                        <a href="#">{link}</a>
                      </li>
                    ) : (
                      <li key={j}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    )
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral mt-10 pt-6 text-center text-secondary/60">
          - All right reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
