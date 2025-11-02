"use client";

import Link from "next/link";

export default function NavbarLinks() {
  return (
    <nav className="flex items-center gap-5 text-sm text-[#2e2e2e]">
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/product-listing" className="hover:underline">Product</Link>
      <Link href="/about" className="hover:underline">About</Link>
      <Link href="/contact-us" className="hover:underline">Contact</Link>
    </nav>
  );
}
