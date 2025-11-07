"use client";

import Image from "next/image";

const FacebookMessenger = () => {
  const handleMessengerClick = () => {
    window.open("https://m.me/61582330113753", "_blank");
  };

  return (
    <div className="group relative">
      <div
        onClick={handleMessengerClick}
        className="fixed rounded-full bottom-16 right-4 sm:bottom-16 md:bottom-20 lg:bottom-6 p-0 sm:p-1 sm:right-6 z-50 bg-gray-200 hover:bg-gray-100 shadow-2xl border-blue-200 cursor-pointer transition-all duration-300 hover:scale-110"
      >
        <Image 
          src="/messenger.png" 
          alt="Chat with us" 
          width={40} 
          height={40} 
        />
      </div>
      
      {/* Hover Tooltip */}
      <div className="fixed bottom-20 right-16 sm:bottom-12 sm:right-20 md:bottom-14 lg:bottom-10 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-primary text-[#2e2e2e] px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
          Chat with us!
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-primary rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default FacebookMessenger;