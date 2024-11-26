import { CreateAricleDto } from "@/utils/dtos";
import { creatArticleSchema } from "@/utils/validationSchema";
import { NextResponse, NextRequest } from "next/server";
import { Article } from "@prisma/client";
import prisma from "@/utils/db";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { verifyToken } from "@/utils/verifyToken";

/**
 *@method GET
 *@route ~/api/articles
 *@description get  Articles by page number
 *@access Public
 * @param reguest
 * @returns articles
 */
export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";

    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });
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
/**
 *@method POST
 *@route ~/api/articles
 *@description create new Article
 *@access private only admin
 * @param reguest
 * @returns articles
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as CreateAricleDto;

    const validation = creatArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        {
          status: 400,
        }
      );
    }
    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
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
