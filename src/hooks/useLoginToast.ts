"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export const useLoginToast = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const toastKey = `login-toast-${session.user.email || session.user.id}`;
      const hasShownToast = sessionStorage.getItem(toastKey);
      
      if (!hasShownToast) {
        toast.success(`Welcome back, ${session.user.name || "User"}!`);
        sessionStorage.setItem(toastKey, "true");
      }
    }
    
    if (status === "unauthenticated") {
      sessionStorage.clear();
    }
  }, [status, session]);
};