"use client";
import React, { useState } from "react";
import { Home, User, Heart, Package, MapPin, CreditCard, Key, LogOut, Menu, X } from "lucide-react";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const SidebarLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}> = ({ icon, label, active }) => (
  <a
    href="#"
    className={cx(
      "flex items-center gap-2 text-sm transition-colors",
      active ? "text-gray-900 font-semibold" : "text-gray-600 hover:text-gray-900"
    )}
  >
    <span className="shrink-0">{icon}</span>
    <span>{label}</span>
  </a>
);

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 rounded-lg mb-8 bg-gray-900 p-2 text-[#2e2e2e]"
        onClick={() => setOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={cx(
          "fixed inset-y-0 left-0 z-40 w-58   transform transition-transform md:static md:translate-x-0 md:col-span-1 p-6",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header only on mobile */}
        <div className="flex items-center mb-4 bg-white justify-between md:hidden">
          <h2 className="text-xl font-semibold text-gray-900"></h2>
          <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-500 md:mt-0">Hey, Good morning</p>
        <h2 className="mt-1 text-xl font-semibold text-gray-900">Tommy</h2>

        <nav className="mt-8 flex flex-col gap-4">
          <SidebarLink icon={<Home size={18} />} label="Home" />
          <SidebarLink icon={<User size={18} />} label="Profile" />
          <SidebarLink icon={<Heart size={18} />} label="Wishlist" />
          <SidebarLink icon={<Package size={18} />} label="My Orders" active />
          <SidebarLink icon={<MapPin size={18} />} label="Address" />
          <SidebarLink icon={<CreditCard size={18} />} label="My Cards" />
          <SidebarLink icon={<Key size={18} />} label="Change Password" />
          <div className="h-px bg-gray-200 my-2" />
          <SidebarLink icon={<LogOut size={18} />} label="Log out" />
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-white bg-opacity-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
