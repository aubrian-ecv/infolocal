"use server"

import { prisma } from "@/lib/prisma";
import { SurveyFormType } from "./new/survey.schema";
import { revalidatePath } from "next/cache";

export async function createSurvey(values: SurveyFormType) {
  try {
    await prisma.survey.create({
      data: {
        question: values.question,
        published: values.published,
        options: {
          createMany: {
            data: values.options,
          },
        },
      },
    });
  } catch (error: any) {
    return { type: "error", message: error.message };
  }

  return { type: "success" };
}

export async function updateSurvey(id: number, values: SurveyFormType) {
  try {
    await prisma.survey.update({
      where: { id },
      data: {
        question: values.question,
        published: values.published,
        options: {
          deleteMany: {},
          createMany: {
            data: values.options,
          },
        },
      },
    });
  } catch (error: any) {
    return { type: "error", message: error.message };
  }
  revalidatePath("/admin/surveys");
  return { type: "success" };
}

export async function getSurveyList() {
  return await prisma.survey.findMany({
    include: {
      results: true
    }
  });
}

export async function publishSurvey(id: number) {
  await prisma.survey.update({
    where: { id },
    data: {
      published: true
    }
  });

  revalidatePath("/admin/surveys");
}

export async function getSurvey(id: string) {
  return await prisma.survey.findUnique({
    where: { id: parseInt(id) },
    include: {
      options: true
    }
  });
}

export async function getSurveyResults(id: string) {
  return await prisma.survey.findUnique({
    where: { id: parseInt(id) },
    include: {
      results: {
        include: {
          option: true
        }
      }
    }
  });
}