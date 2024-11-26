/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateCommentDto } from "@/utils/dtos";
interface props {
  params: { id: string };
}
/**
 *@method  PUT
 *@route ~/api/comments/:id
 *@description update comment
 *@access private (only owner of the comment)
 * @param reguest
 * @returns articles
 */
export async function PUT(request: NextRequest, { params }: props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (user === null || user.id !== comment.userID) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as UpdateCommentDto;
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: { text: body.text },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
/**
 *@method  DELETE
 *@route ~/api/comments/:id
 *@description delete comment
 *@access private (only admin or owner of the comment)
 * @param reguest
 * @returns articles
 */
export async function DELETE(request: NextRequest, { params }: props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json(
        { message: "no token provider, access denied" },
        { status: 401 }
      );
    }
    if (user.isAdmin || user.id === comment.userID) {
      await prisma.comment.delete({ where: { id: parseInt(params.id) } });
      return NextResponse.json({ message: "comment deleted" }, { status: 200 });
    }
    return NextResponse.json(
      { message: "you are not allowed, access denied " },
      { status: 403 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
