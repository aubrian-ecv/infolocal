"use server";

import {
  hashStringWithSalt,
  validatePassword,
} from "@/lib/auth/credentials-provider";
import { prisma } from "@/lib/prisma";
import { LoginCredentialsFormScheme, LoginCredentialsFormType } from "./signup.schema";
import { action } from "@/lib/server-actions/safe-actions";

// @ts-ignore
export const signUpAction = action(
  LoginCredentialsFormScheme,
  async ({ email, password, name }: LoginCredentialsFormType) => {
    if (!validatePassword(password)) {
      throw new Error(
        "Invalid new password. Must be at least 8 characters, and contain at least one letter and one number"
      );
    }

    try {
      const userData = {
        email,
        passwordHash: hashStringWithSalt(
          password,
          process.env.NEXTAUTH_SECRET!
        ),
        name,
      };

      const user = await prisma.user.create({
        data: {
          ...userData,
        },
      });

      return user;
    } catch {
      throw new Error("Email already exists");
    }
  }
);
