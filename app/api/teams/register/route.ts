import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, description } = body;

  const userId = parseInt(session.user?.id!);

  const team = await prisma.team.create({
    data: {
      name,
      description,
      ownerId: userId,
    },
  });

  return NextResponse.json(team);
}
