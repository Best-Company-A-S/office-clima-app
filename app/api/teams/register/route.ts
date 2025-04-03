import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, description } = body;

  const team = await prisma.team.create({
    data: {
      name,
      description,
      ownerId: session.user?.id!,
    },
  });

  return NextResponse.json(team);
}
