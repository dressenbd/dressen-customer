"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";

export default function DashboardPage() {
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);

  // ক্লায়েন্ট-গার্ড: লগইন না থাকলে লগইনে পাঠাই
  useEffect(() => {
    if (!currentUser?.id) {
      router.replace("/auth/login");
    }
  }, [currentUser?.id, router]);

  if (!currentUser?.id) {
    return <div className="p-6">Redirecting to login...</div>;
  }

  const displayName =
    currentUser?.name ||
    (currentUser?.email ? currentUser.email.split("@")[0] : "User");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Welcome, {displayName} 👋</h1>
      <p className="text-gray-600">
        This is your dashboard. From here you can manage orders, profile, and more.
      </p>

      {/* এখানে আপনার ড্যাশবোর্ড উইজেট/কার্ডগুলো রাখুন */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">Recent Orders</div>
        <div className="rounded-lg border p-4">Wishlist</div>
        <div className="rounded-lg border p-4">Account Summary</div>
      </div>
    </div>
  );
}