import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schema for survey response
const responseSchema = z.object({
  answers: z.object({
    comfort: z.number().min(1).max(5),
    suggestions: z.string().optional(),
  }),
});

export async function POST(
  request: Request,
  context: { params: { surveyId: string } }
) {
  try {
    const { surveyId } = await context.params;

    // Get the survey to check if it's active
    const survey = await prisma.survey.findUnique({
      where: { id: surveyId },
    });

    if (!survey) {
      return NextResponse.json({ error: "Survey not found" }, { status: 404 });
    }

    if (!survey.active) {
      return NextResponse.json(
        { error: "This survey is no longer active" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate request body
    const validation = responseSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      );
    }

    // Create the response
    const response = await prisma.surveyResponse.create({
      data: {
        surveyId,
        rating: validation.data.answers.comfort,
        comment: validation.data.answers.suggestions || null,
        answers: validation.data.answers,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[SURVEY_RESPONSE_CREATE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  context: { params: { surveyId: string } }
) {
  try {
    const { surveyId } = await context.params;

    const responses = await prisma.surveyResponse.findMany({
      where: { surveyId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(responses);
  } catch (error) {
    console.error("[SURVEY_RESPONSES_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
