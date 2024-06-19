import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User } from "@prisma/client";
import type { Session } from "next-auth";
import NextAuth from "next-auth";
import { prisma } from "../prisma";
import { credentialsOverrideJwt, credentialsSignInCallback, getCredentialsProvider } from "./credentials-provider";


export const { handlers, signIn, signOut, auth: baseAuth } = NextAuth((req) => ({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    session(params) {      
      if (params.newSession) return params.session;

      const typedParams = params as unknown as {
        session: Session;
        user?: User;
      };

      if (!typedParams.user) return typedParams.session;

      typedParams.user.passwordHash = null;

      return typedParams.session;
    },
    jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id }; // Save id to token as docs says: https://next-auth.js.org/configuration/callbacks
      }
      return token;
    },
  },
  events: {
    signIn: credentialsSignInCallback(req)
  },
  providers: [
    getCredentialsProvider()
  ]
}));
