"use server"

import { cookies } from "next/headers";

export const saveSessionCookie = async (tokenName: string, uuid: string, expireAt: Date) => {
    const cookieList = cookies();

    cookieList.set(tokenName, uuid, {
      expires: expireAt,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
}