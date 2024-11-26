import prisma from "@/utils/db";
import { Article } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
/**
 *@method GET
 *@route ~/api/articles/search?searchText=value
 *@description get  Articles by search text
 *@access Public
 * @param reguest
 * @returns articles
 */
export async function GET(request: NextRequest) {
  try {
    const searchText = request.nextUrl.searchParams.get("searchText");
    let articles: Article[] = [];
    if (searchText) {
      articles = await prisma.article.findMany({
        where: {
          title: {
            contains: searchText,
            mode: "insensitive",
          },
        },
      });
    } else {
      articles = await prisma.article.findMany({ take: 6 });
    }
    return NextResponse.json(articles, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      {
        message: "internal server error",
      },
      { status: 500 }
    );
  }
}
