import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const responseSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().nullable(),
});

export async function POST(
  request: Request,
  { params }: { params: { surveyId: string } }
) {
  try {
    const survey = await prisma.survey.findUnique({
      where: { id: params.surveyId },
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
    const validatedData = responseSchema.parse(body);

    const response = await prisma.surveyResponse.create({
      data: {
        surveyId: survey.id,
        rating: validatedData.rating,
        comment: validatedData.comment,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid survey response data" },
        { status: 400 }
      );
    }

    console.error("[SURVEY_RESPONSE_CREATE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
