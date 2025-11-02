import React from "react";
import Sidebar from "./Sidebar";
import Promo from "./Promo";

const HeroSection = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      <Sidebar />
      <div className="flex-1">
        <Promo />
      </div>
    </div>
  );
};

export default HeroSection;
