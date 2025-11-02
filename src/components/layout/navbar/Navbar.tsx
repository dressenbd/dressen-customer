"use client";

import NavbarLinks from "./NavbarLinks";
import NavbarActions from "./NavbarActions";

export default function Navbar() {
  return (
    <div className="w-full bg-red-900 lg:sticky lg:top-0 lg:z-50">
      {/* full width bar */}
      <div className="w-full h-12 px-3 md:px-6 xl:px-10">
        <div className="flex items-center justify-between h-full">
          <NavbarLinks />
          <NavbarActions />
        </div>
      </div>
    </div>
  );
}
