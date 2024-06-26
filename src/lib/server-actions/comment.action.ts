"use server";

import { Comment } from "@prisma/client";
import { requiredAuth } from "../auth/helper";
import { prisma } from "../prisma";
import { error } from "console";

// ###################################
// # LIKE ACTIONS
// ###################################

export async function getLikeStatusForUser(comment: Comment) {
  try {
    const user = await requiredAuth();

    const like = await prisma.like.findFirst({
      where: {
        CommentId: comment.id,
        UserId: parseInt(user.id as unknown as string),
      },
    });

    return !!like;
  } catch (_) {
    return false;
  }
}

export async function getTotalLikesForComment(comment: Comment) {
  const likes = await prisma.like.count({
    where: {
      CommentId: comment.id,
    },
  });

  return likes;
}

export async function likePostComment(comment: Comment) {
  try {
    const user = await requiredAuth();

    await prisma.like.create({
      data: {
        UserId: parseInt(user.id as unknown as string),
        CommentId: comment.id,
      },
    });

    return {
      success: true,
    };
  } catch (e) {
    return {
      error: "NOT_LOGGED_IN",
    };
  }
}

export async function createComment(
  content: string,
  options: { articleId?: string; hubId?: string; parentId?: number }
) {
  try {
    const user = await requiredAuth();

    const comment = await prisma.comment.create({
      data: {
        content,
        UserId: parseInt(user.id as unknown as string),
        ArticleId: options.articleId ? parseInt(options.articleId) : undefined,
        HubId: options.hubId ? parseInt(options.hubId) : undefined,
        parentId: options.parentId ? options.parentId : undefined,
      },
    });

    return {
      success: true,
    };
  } catch (e) {
    return {
      error: "NOT_LOGGED_IN",
    };
  }
}

export async function getUserComments() {
  try {
    const user = await requiredAuth();

    return await prisma.comment.findMany({
      where: {
        UserId: parseInt(user.id as unknown as string),
      },
      include: {
        user: true,
        _count: {
          select: {
            likes: true,
          },
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (e) {
    return [];
  }
}
