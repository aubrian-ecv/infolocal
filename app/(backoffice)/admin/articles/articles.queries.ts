"use server"

import { requiredAuth } from "@/lib/auth/helper";
import { prisma } from "@/lib/prisma";
import { ArticleFormType } from "./article.schema";

export async function getArticlesList() {
    try {
        const user = await requiredAuth();

        return await prisma.article.findMany({
            where: {
                authorId: parseInt(user.id as unknown as string)
            }
        })
    } catch(e) {
        return [];
    }
}

export async function createArticle(values: ArticleFormType) {
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