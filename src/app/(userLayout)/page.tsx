

import type { Metadata } from "next";
import ClientHome from "@/components/home/ClientHome";

export const metadata: Metadata = {
  title: "Dressen - Best Deals | Home",
  description: "Premium Clothing & more in Bangladesh.",
};

export default function HomePage() {
  
  return <ClientHome />;
}
