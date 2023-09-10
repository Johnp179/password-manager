import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import env from "@/lib/parse-env";

const maxAge = 1 * 60 * 60; //seconds

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  jwt: {
    maxAge,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const resp = await fetch(`${env.NEXTAUTH_URL}/api/user/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          if (!resp.ok) {
            return null;
          }
          const user = await resp.json();
          return user;
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      return token;
    },
    async session({ session, token, user }) {
      session.expiryDate = new Date(token.exp * 1000).toISOString();
      session.user.id = token.sub;
      return session;
    },
  },
};
