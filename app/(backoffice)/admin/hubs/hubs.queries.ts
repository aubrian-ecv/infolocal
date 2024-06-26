"use server"

import { requiredAuth } from "@/lib/auth/helper";
import { prisma } from "@/lib/prisma";
import { HubFormType } from "./hub.schema";

export async function getHubsList() {
    try {
        const user = await requiredAuth();

        return await prisma.hub.findMany({
            where: {
                ownerId: parseInt(user.id as unknown as string)
            },
            include: {
                _count: {
                    select: {
                        likes: true,
                        users: true
                    }
                }
            }
        })
    } catch(e) {
        return [];
    }
}

export async function createHub(values: HubFormType) {
    try {
        const user = await requiredAuth();

        return await prisma.hub.create({
            data: {
                ...values,
                ownerId: parseInt(user.id as unknown as string)
            }
        })
    } catch(e) {
        return null;
    }
}