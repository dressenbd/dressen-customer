"use client";

import Image from "next/image";

const FacebookMessenger = () => {
  const handleMessengerClick = () => {
    window.open("https://m.me/61582330113753", "_blank");
  };

  return (
    <div
      onClick={handleMessengerClick}
      className=""
    >
      <Image 
      className="fixed rounded-full bottom-16 right-4 sm:bottom-6 p-0 sm:p-1 sm:right-6 z-50 bg-gray-200 hover:bg-gray-100 shadow-2xl border-blue-200 cursor-pointer transition-all duration-300 hover:scale-110"
        src="/messenger.png" 
        alt="Messenger" 
        width={40} 
        height={40} 
      />
      
    </div>
  );
};

export default FacebookMessenger;