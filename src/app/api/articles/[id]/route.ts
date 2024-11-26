import { UdpateAricleDto } from "@/utils/dtos";
import { NextResponse, NextRequest } from "next/server";

import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
  params: { id: string };
}
/**
 *@method GET
 *@route ~/api/articles/:id
 *@description get single Article
 *@access Public
 * @param reguest
 * @returns articles
 */
export async function GET(reguest: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: {
              select: {
                userName: true,
              },
            },
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "the article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
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
 *@method PUT
 *@route ~/api/articles/:id
 *@description update article
 *@access Public
 * @param reguest
 * @returns articles
 */
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denid" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as UdpateAricleDto;
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "the article not found" },
        { status: 404 }
      );
    }

    const updatedArticle = await prisma.article.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(updatedArticle, { status: 200 });
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
 *@method DELETE
 *@route ~/api/articles/:id
 *@description update article
 *@access private only admin
 * @param reguest
 * @returns articles
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denid" },
        { status: 403 }
      );
    }
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        comments: true,
      },
    });
    const commentIds = article?.comments.map((comment) => comment.id);

    await prisma.comment.deleteMany({
      where: {
        id: {
          in: commentIds,
        },
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "the article not found" },
        { status: 404 }
      );
    }
    await prisma.article.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({ message: "article deleted" }, { status: 200 });
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
