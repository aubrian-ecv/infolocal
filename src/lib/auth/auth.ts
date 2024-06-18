import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User } from "@prisma/client";
import type { Session } from "next-auth";
import NextAuth from "next-auth";
import { prisma } from "../prisma";
import { credentialsOverrideJwt, credentialsSignInCallback, getCredentialsProvider } from "./credentials-provider";
import CredentialsProvider from "next-auth/providers/credentials";


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
  },
  events: {
    signIn: credentialsSignInCallback(req)
  },
  providers: [
    getCredentialsProvider()
  ],
  jwt: credentialsOverrideJwt
}));
