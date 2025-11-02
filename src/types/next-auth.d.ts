/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend User
declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
    gender?: string;
    walletPoint?: number;
  }

  interface Session {
    user: {
      id?: string;
      role?: string;
      gender?: string;
      walletPoint?: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    gender?: string;
    walletPoint?: number;
  }
}
