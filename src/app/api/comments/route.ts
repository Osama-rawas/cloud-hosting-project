import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { createCommentDto } from "@/utils/dtos";
import { createCommentSchema } from "@/utils/validationSchema";
/**
 *@method  POST
 *@route ~/api/comments
 *@description create new comment
 *@access private (only logged in user)
 * @param reguest
 * @returns articles
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json(
        { message: "only logged in user ,access denied" },
        { status: 401 }
      );
    }
    const body = (await request.json()) as createCommentDto;
    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userID: user.id,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
/**
 *@method  GET
 *@route ~/api/comments
 *@description gat all comments
 *@access private (only admin)
 * @param reguest
 * @returns comments
 */
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }
    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
