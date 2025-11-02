"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, logoutUser } from "@/redux/featured/auth/authSlice";

interface ExtendedUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  gender?: string;
  walletPoint?: number;
}

export default function AuthSyncProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (session?.user) {
      const user = session.user as ExtendedUser;
      // Sync NextAuth session with Redux
      dispatch(setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        gender: user.gender,
        walletPoint: user.walletPoint,
      }));
    } else {
      // No session, clear Redux state
      dispatch(logoutUser());
    }
  }, [session, status, dispatch]);

  return <>{children}</>;
}