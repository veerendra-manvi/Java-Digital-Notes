import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companySlug = searchParams.get("company");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: any = {
      isApproved: true,
    };

    if (companySlug) {
      where.company = {
        slug: companySlug,
      };
    }

    const [questions, total] = await Promise.all([
      prisma.companyQuestion.findMany({
        where,
        include: {
          company: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.companyQuestion.count({ where }),
    ]);

    return NextResponse.json({
      data: questions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Failed to fetch company questions:", error);

    return NextResponse.json(
      { error: "Failed to fetch company questions" },
      { status: 500 }
    );
  }
}