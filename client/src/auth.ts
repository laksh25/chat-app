import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ROUTES } from "./lib/routes";
import Google from "next-auth/providers/google";
// import Google from "next-auth/providers/google";

export const config: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
              credentials: "include", // backend sets HTTP-only cookie
            },
          );

          if (!res.ok) return null;

          const { user } = await res.json();

          return { id: user.id, email: user.email, name: user.name };
        } catch {
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = request.nextUrl.pathname.startsWith("/login");

      // logged in + visits public page → redirect to chat page
      if (isLoggedIn && isOnLoginPage) {
        return Response.redirect(new URL(ROUTES.CHAT, request.nextUrl));
      }

      // not logged in + visits protected page → redirect to login
      if (!isLoggedIn && !isOnLoginPage) {
        return Response.redirect(new URL(ROUTES.LOGIN, request.nextUrl));
      }

      return true;
    },

    async signIn({ user, account }) {
      // Only runs for Google login — tell YOUR backend about the Google user
      if (account?.provider === "google") {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/google`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              // Send Google's token — your backend verifies it and sets HTTP-only cookie
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                avatar: user.image,
              }),
            },
          );

          return res.ok; // false = deny login
        } catch {
          return false;
        }
      }

      return true; // credentials login — already handled in authorize()
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  pages: { signIn: ROUTES.LOGIN },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
