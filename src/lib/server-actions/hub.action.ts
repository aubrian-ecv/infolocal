"use server";

import { Hub } from "@prisma/client";
import { requiredAuth } from "../auth/helper";
import { prisma } from "../prisma";

// ###################################
// # LIKE ACTIONS
// ###################################

export async function getLikeStatusForUser(hub: Hub) {
  try {
    const user = await requiredAuth();

    const like = await prisma.like.findFirst({
      where: {
        HubId: hub.id,
        UserId: parseInt(user.id as unknown as string),
      },
    });

    return !!like;
  } catch (_) {
    return false;
  }
}

export async function getTotalLikesForHub(hub: Hub) {
  const likes = await prisma.like.count({
    where: {
      HubId: hub.id,
    },
  });

  return likes;
}

export async function likeHubAction(hub: Hub) {
  try {
    const user = await requiredAuth();

    await prisma.like.create({
      data: {
        UserId: parseInt(user.id as unknown as string),
        HubId: hub.id,
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

export async function getJoinStatusForUser(hub: Hub) {
  try {
    const user = await requiredAuth();
    const join = await prisma.hub.findFirst({
      where: {
        id: hub.id,
        users: {
          some: {
            id: parseInt(user.id as unknown as string),
          },
        },
      },
    });

    return !!join;
  } catch (_) {
    return false;
  }
}

export async function joinHubAction(hub: Hub) {
  try {
    const user = await requiredAuth();

    await prisma.hub.update({
      where: {
        id: hub.id,
      },
      data: {
        users: {
          connect: {
            id: parseInt(user.id as unknown as string),
          },
        },
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

export async function getUserHubs() {
  try {
    const user = await requiredAuth();

    return await prisma.hub.findMany({
      where: {
        users: {
          some: {
            id: parseInt(user.id as unknown as string),
          },
        },
      },
      include: {
        users: true,
      },
    });
  } catch (e) {
    return [];
  }
}

export async function getHubDetails(hubId: number) {
  return await prisma.hub.findUnique({
    where: {
      id: hubId,
    },
    include: {
      comments: {
        where: {
          parentId: null
        },
        include: {
          answers: {
            include: {
              user: true,
              _count: {
                select: {
                  likes: true,
                },
              },
            },
          },
          user: true,
          _count: {
            select: {
              likes: true,
            },
          },
        },
      },
      users: true,
    },
  });
}
