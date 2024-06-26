import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "../prisma";
import { credentialsSignInCallback, getCredentialsProvider } from "./credentials-provider";


export const { handlers, signIn, signOut, auth: baseAuth } = NextAuth((req) => ({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    session({ session, token, newSession }) {      
      if (newSession) return session;      

      if (token) {
        session.user = {
          // @ts-ignore
          id: token.id,
          email: token.email!,
          name: token.name!,
          image: token.picture!,
          // @ts-ignore
          roles: token.roles.map(role => role.name)
        };
      }
      
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        return { ...token, id: user.id, roles: user.roles }; // Save id to token as docs says: https://next-auth.js.org/configuration/callbacks
      }
      return token;
    },
  },
  events: {
    signIn: credentialsSignInCallback(req)
  },
  providers: [
    getCredentialsProvider()
  ],
  pages: {
    signIn: "/auth/signin"
  }
}));
