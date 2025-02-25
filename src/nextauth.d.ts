import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: number;
      email: string;
      name?: string;
      image?: string;
      roles?: {
        id: number;
        name: string;
      }[];
    };
  }
}