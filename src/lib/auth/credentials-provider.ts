import crypto from "crypto";
import { nanoid } from "nanoid";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextRequest } from "next/server";
import { prisma } from "../prisma";
import { saveSessionCookie } from "./cookie.action";

const PASSWORD_REGEX = /^(?=.*[A-Za-z]).{8,}$/;

export const validatePassword = (password: string) => {
  return PASSWORD_REGEX.test(password);
};

export const hashStringWithSalt = (string: string, salt: string) => {
  const hash = crypto.createHash("sha256");

  const saltedString = salt + string;

  hash.update(saltedString);

  const hashedString = hash.digest("hex");

  return hashedString;
};

export const getCredentialsProvider = () => {
  return CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "text", placeholder: "Your email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials.email || !credentials.password) return null;

      // Add logic here to look up the user from the credentials supplied
      const passwordHash = hashStringWithSalt(
        String(credentials.password),
        process.env.NEXTAUTH_SECRET!,
      );

      const user = await prisma.user.findFirst({
        where: {
          email: credentials.email,
          passwordHash: passwordHash,
        },
        include: {
          roles: true
        }
      });

      if (user) {
        return {
          id: `${user.id}`,
          email: user.email,
          name: user.name,
          image: user.image,
          roles: user.roles
        };
      } else {
        return null;
      }
    },
  });
};

const tokenName =
  process.env.NODE_ENV === "development"
    ? "authjs.session-token"
    : "__Secure-authjs.session-token";

type SignInCallback = NonNullable<NextAuthConfig["events"]>["signIn"];

type JwtOverride = NonNullable<NextAuthConfig["jwt"]>;

export const credentialsSignInCallback =
  (request: NextRequest | undefined): SignInCallback =>
  async ({ user }) => {
    if (!request) {
      return;
    }

    if (request.method !== "POST") {
      return;
    }

    const currentUrl = request.url;

    if (!currentUrl.includes("credentials")) {
      return;
    }

    if (!currentUrl.includes("callback")) {
      return;
    }

    const uuid = nanoid();
    // + 7 days
    const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await prisma.session.create({
      data: {
        sessionToken: uuid,
        userId: parseInt(user.id ?? ""),
        // expires in 2 weeks
        expires: expireAt,
      },
    });

    saveSessionCookie(tokenName, uuid, expireAt)

    return;
  };

// This override cancel JWT strategy for password. (it's the default one)
export const credentialsOverrideJwt: JwtOverride = {
  async encode() {    
    return "";
  },
  async decode() {
    return null;
  },
};