"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { useGetSettingsQuery } from "@/redux/featured/settings/settingsApi";

export default function Footer() {
  const appStoreUrl =
    "https://res.cloudinary.com/dtges64tg/image/upload/w_120,h_40,f_auto,q_auto/v1759399126/appstore_waa00a.png";
  const googlePlayUrl =
    "https://res.cloudinary.com/dtges64tg/image/upload/w_120,h_40,f_auto,q_auto/v1759399057/googleplay_kxh8bu.png";

  // logged-in check (your app uses currentUser.id)
  const currentUser = useAppSelector(selectCurrentUser);
  const isLoggedIn = Boolean(currentUser?.id);
  const { data: settings } = useGetSettingsQuery();
  // const sellerHref = isLoggedIn ? "/sr" : "/auth/login";

  const sellerHref = "https://dressen-admin-panel-gamma.vercel.app/auth/login";

  return (
    <footer className="bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="mb-6">
              {settings?.logo ? (
                <Image
                  src={settings.logo}
                  alt="Dressen Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto mb-1"
                />
              ) : (
                <h2 className="text-2xl font-bold text-[#facf35] mb-1">Dressen</h2>
              )}
              <p className="text-sm text-gray-600 mb-6">
                Connect with our social media platforms
              </p>

              {/* Social Media Icons */}
              <div className="space-y-3 mb-6">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Follow Us:
                </div>
                <div className="flex flex-col gap-2">
                  {settings?.contactAndSocial?.facebookUrl?.map((url, index) => {
                    const labels = ['Dressen Facebook Page', 'Dressen Facebook Page', 'Dressen Facebook Page'];
                    return (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <Facebook className="w-4 h-4 text-white" />
                        </div>
                        {labels[index] || `Facebook Page ${index + 1}`}
                      </a>
                    );
                  })}
                  {settings?.contactAndSocial?.youtubeUrl?.[0] && (
                    <a
                      href={settings.contactAndSocial.youtubeUrl[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </div>
                      Dressen YouTube Channel
                    </a>
                  )}
                </div>
              </div>

              {/* App Store Buttons */}
              <div className="flex gap-3">
                <Image
                  src={appStoreUrl}
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="rounded"
                />
                <Image
                  src={googlePlayUrl}
                  alt="Get it on Google Play"
                  width={120}
                  height={40}
                  className="rounded"
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 className="font-semibold text-black mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/faqs-page" className="hover:text-black transition-colors">
                  FAQ
                </Link>
              </li>
              
               <li>
                <Link href="/return-policy" className="hover:text-black transition-colors">
                  {settings?.returnPolicy?.title || 'Return & Exchange'}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-black transition-colors">
                  {settings?.privacyPolicy?.title || 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Search
                </a>
              </li>
             
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold text-black mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href={`mailto:${settings?.contactAndSocial?.email || 'dressenbd@gmail.com'}`}
                  className="hover:text-black transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  {settings?.contactAndSocial?.email || 'dressenbd@gmail.com'}
                </a>
              </li>
              <li>
                <a
                  href={(() => {
                    const whatsappLink = settings?.contactAndSocial?.whatsappLink?.[0];
                    const phone = settings?.contactAndSocial?.phone || '+88019090008004';
                    
                    // If whatsappLink exists and is a proper URL, use it
                    if (whatsappLink && (whatsappLink.startsWith('https://wa.me/') || whatsappLink.startsWith('https://api.whatsapp.com/'))) {
                      return whatsappLink;
                    }
                    
                    // Otherwise, create proper WhatsApp URL from phone number
                    const cleanPhone = phone.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                    return `https://wa.me/${cleanPhone}`;
                  })()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
                  </svg>
                  {settings?.contactAndSocial?.phone || '+88 019090008004'}
                </a>
              </li>
              <li className="text-sm">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="text-gray-500">
                    {settings?.contactAndSocial?.address || 'Kazla, Dhaka, Bangladesh'}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="font-semibold text-black mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              
               <li>
                <a href="/product-listing" className="hover:text-black transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <Link href="/tracking-order" className="hover:text-black transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <a
                  href="https://dressen-admin-panel-gamma.vercel.app/auth/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Dressen Admin
                </a>
              </li>
              
             
            </ul>
          </div>

          {/* Our Information Section */}
          <div>
            <h3 className="font-semibold text-black mb-4">Our Information</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              
              <li>
                <a href="/about" className="hover:text-black transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-black transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12  pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500 mb-4 ">
            © {new Date().getFullYear()} Dressen Ltd. All rights reserved - Design &amp; Developed by <span className="text-md">WebQ Team</span> 
          </p>
        </div>
      </div>
    </footer>
  );
}
