"use server"

import { EditUserFormType } from "../../../app/(main)/profile/edit/edituser.schema";
import { signOut } from "../auth/auth";
import { requiredAuth } from "../auth/helper";
import { prisma } from "../prisma";

export async function editUserPicture(newPicture: string) {
    try {
        const user = await requiredAuth();

        await prisma.user.update({
            where: {
                id: parseInt(user.id as unknown as string),
            },
            data: {
                image: newPicture,
            }
        });

        return {
            success: true,
        };
    } catch (e: any) {
        return {
            error: "NOT_LOGGED_IN"
        };
    }
}

export async function updateUser(values: EditUserFormType) {
    try {
        const user = await requiredAuth();

        await prisma.user.update({
            where: {
                id: parseInt(user.id as unknown as string),
            },
            data: {
                name: values.name,
                email: values.email,
            }
        });

        return {
            success: true,
        };
    } catch (e: any) {
        return {
            error: "NOT_LOGGED_IN"
        };
    }
}

export async function getUserData() {
    try {
        const user = await requiredAuth();

        return await prisma.user.findUnique({
            where: {
                id: parseInt(user.id as unknown as string),
            }
        });
    } catch (e: any) {
        return null;
    }
}

export async function signOutAction() {
    await signOut({
        redirect: true,
        redirectTo: "/"
    });
}