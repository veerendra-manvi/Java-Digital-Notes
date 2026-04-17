import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      where: {
        isActive: true,
      },
      include: {
        _count: {
          select: { questions: true, codingProblems: true },
        },
      },
      orderBy: {
        tier: "asc", 
      },
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}