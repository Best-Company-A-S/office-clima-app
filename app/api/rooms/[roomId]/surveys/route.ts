import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const roomId = request.url.split("/").slice(-2)[0];
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Check if user is either the team owner or a team member
    const userId = parseInt(session.user?.id || "0", 10);
    const isOwner = room.team.ownerId === userId;
    const isMember = room.team.members.some(
      (member: { userId: number; teamId: string; id: string }) =>
        member.userId === userId
    );

    console.log({
      userId: session.user?.id,
      ownerId: room.team.ownerId,
      isOwner,
      isMember,
      members: room.team.members,
    });

    if (!isOwner && !isMember) {
      return NextResponse.json(
        { error: "You don't have access to this room" },
        { status: 403 }
      );
    }

    // Create a new survey
    const survey = await prisma.survey.create({
      data: {
        title: `${room.name} Survey`,
        roomId: room.id,
        createdById: userId,
        active: true,
      },
    });

    // Generate a QR code for the survey URL
    const baseUrl = new URL(request.url).origin;
    const surveyUrl = `${baseUrl}/surveys/${survey.id}`;
    const qrCode = await QRCode.toDataURL(surveyUrl);

    return NextResponse.json({
      surveyId: survey.id,
      qrCode,
      url: surveyUrl,
    });
  } catch (error) {
    console.error("[SURVEY_CREATE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const roomId = request.url.split("/").slice(-2)[0];
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Check if user is either the team owner or a team member
    const userId = parseInt(session.user?.id || "0", 10);
    const isOwner = room.team.ownerId === userId;
    const isMember = room.team.members.some(
      (member: { userId: number; teamId: string; id: string }) =>
        member.userId === userId
    );

    console.log({
      userId: session.user?.id,
      ownerId: room.team.ownerId,
      isOwner,
      isMember,
      members: room.team.members,
    });

    if (!isOwner && !isMember) {
      return NextResponse.json(
        { error: "You don't have access to this room" },
        { status: 403 }
      );
    }

    // Get all surveys for the room
    const surveys = await prisma.survey.findMany({
      where: {
        roomId: room.id,
      },
      include: {
        _count: {
          select: {
            responses: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      surveys.map(
        (survey: {
          id: string;
          title: string;
          active: boolean;
          createdAt: Date;
          _count: { responses: number };
        }) => ({
          id: survey.id,
          title: survey.title,
          active: survey.active,
          createdAt: survey.createdAt,
          responses: survey._count.responses,
        })
      )
    );
  } catch (error) {
    console.error("[SURVEYS_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
