"use server";

import { Article } from "@prisma/client";
import { requiredAuth } from "../auth/helper";
import { prisma } from "../prisma";
import { error } from "console";

// ###################################
// # LIKE ACTIONS
// ###################################

export async function getLikeStatusForUser(article: Article) {
  try {
    const user = await requiredAuth();

    const like = await prisma.like.findFirst({
      where: {
        ArticleId: article.id,
        UserId: parseInt(user.id as unknown as string),
      },
    });

    return !!like;
  } catch (_) {
    return false;
  }
}

export async function getTotalLikesForArticle(article: Article) {
  const likes = await prisma.like.count({
    where: {
      ArticleId: article.id,
    },
  });

  return likes;
}

export async function likePostAction(article: Article) {
  try {
    const user = await requiredAuth();

    await prisma.like.create({
      data: {
        UserId: parseInt(user.id as unknown as string),
        ArticleId: article.id,
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

// ###################################
// # SHARE ACTIONS
// ###################################

export async function sharePostAction(article: Article) {
  try {
    await prisma.share.create({
      data: {
        ArticleId: article.id,
      },
    });

    return {
      success: true,
    };
  } catch (_) {
    return {
      error: true,
    };
  }
}

export async function getTotalSharesForArticle(article: Article) {
  const shares = await prisma.share.count({
    where: {
      ArticleId: article.id,
    },
  });

  return shares;
}

// ###################################
// # COMMENTS ACTIONS
// ###################################

export async function getTotalCommentsForArticle(article: Article) {
  const comments = await prisma.comment.count({
    where: {
      ArticleId: article.id,
    },
  });

  return comments;
}