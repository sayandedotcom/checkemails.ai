import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/login", // custom login page
    signOut: "/", // signout page
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    // maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    // async encode() {},
    // async decode() {},
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      const dbUser = await prisma.user.findFirst({
        // ! optimise with prisma
        where: {
          email: token.email,
        },
      });

      return {
        ...token,
        id: dbUser.id,
        name: dbUser.name,
        userName: dbUser.userName,
        email: dbUser.email,
        picture: dbUser.image,
        locale: profile?.locale ?? dbUser.locale,
        stripeCustomerId: dbUser.stripeCustomerId,
        stars: dbUser.stars ?? 0,
      };
    },
    async session({ session, token, user, trigger }) {
      if (token) {
        session.user.id = token.id;
        session.user.userName = token.userName;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.locale = token.locale;
        session.user.stripeCustomerId = token.stripeCustomerId;
        session.user.stars = token.stars;
      }
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",
};
