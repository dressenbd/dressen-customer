"use client";

import { useGetSettingsQuery } from "@/redux/featured/settings/settingsApi";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export default function HomepagePopup() {
  const { data: settings } = useGetSettingsQuery();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    
    if (!settings?.enableHomepagePopup) return;

    const hasSeenPopup = sessionStorage.getItem("homepage-popup-seen");
    if (hasSeenPopup) {
      
      return;
    }

   
    const timer = setTimeout(() => {
      
      setIsVisible(true);
    }, settings.popupDelay || 3000);

    return () => clearTimeout(timer);
  }, [settings]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("homepage-popup-seen", "true");
  };

  if (!isVisible || !settings?.enableHomepagePopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl w-full relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full z-10 bg-white shadow-md"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        {settings.popupImage && (
          <div className="relative h-48 w-full">
            <Image
              src={settings.popupImage}
              alt="Popup"
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
        )}
        
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{settings.popupTitle}</h2>
          <p className="text-gray-600 mb-4">{settings.popupDescription}</p>
          <button
            onClick={handleClose}
            className="w-full bg-primary text-[#2e2e2e] py-2 px-4 rounded hover:bg-primary"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}