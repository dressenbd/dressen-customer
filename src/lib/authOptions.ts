/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

function normalizeRole(role: unknown) {
  if (typeof role !== "string") return "sr";
  const r = role.toLowerCase();
  return (["admin", "sr", "customer", "vendor"] as const).includes(r as any)
    ? r
    : "sr";
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res.ok) {
            // ডিবাগের জন্য—কি ফিরছে দেখে নাও
            return null;
          }

          const json: any = await res.json();

          // বিভিন্ন শেপ সাপোর্ট করো: data | user | result
          const u = json?.data ?? json?.user ?? json?.result ?? json;

          if (!u?._id && !u?.id) {
            return null;
          }

          // access token থাকলে টোকেনে রাখবো (পরের কল গুলায় কাজে লাগবে)
          const accessToken = json?.token ?? json?.accessToken ?? null;

          return {
            id: u._id ?? u.id,
            name: u.name ?? "",
            email: u.email ?? "",
            role: normalizeRole(u.role),
            gender: u.gender ?? null,
            walletPoint: u.walletPoint ?? 0,
            accessToken,
          } as any;
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/auth/login" },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/login/provider`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: user.name,
                email: user.email,
                provider: "google",
              }),
            }
          );
          const json = await res.json();
          if (res.ok && json?.data) {
            user.id = json.data._id;
            user.role = normalizeRole(json.data.role);
            user.gender = json.data.gender ?? null;
            user.walletPoint = json.data.walletPoint ?? 0;
            user.accessToken = json?.token ?? null;
            return true;
          }
          return false;
        } catch {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.gender = user.gender;
        token.walletPoint = user.walletPoint;
        token.accessToken = user.accessToken ?? token.accessToken ?? null;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.gender = token.gender as string;
        session.user.walletPoint = token.walletPoint as number;
        (session as any).accessToken = token.accessToken ?? null;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to homepage after successful login
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
