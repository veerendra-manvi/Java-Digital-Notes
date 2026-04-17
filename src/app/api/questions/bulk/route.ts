import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idsString = searchParams.get("ids");

    if (!idsString) {
      return NextResponse.json({ data: [] });
    }

    const ids = idsString.split(",").filter(Boolean);

    const questions = await prisma.companyQuestion.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Ensure we return the questions in the order of the IDs provided if needed,
    // or just return them all.
    return NextResponse.json({ data: questions });
  } catch (error) {
    console.error("Failed to fetch bulk questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch bulk questions" },
      { status: 500 }
    );
  }
}
