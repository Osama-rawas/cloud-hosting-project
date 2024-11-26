import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

import { verifyToken } from "@/utils/verifyToken";
import { updateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { updateUserSchema } from "@/utils/validationSchema";
interface props {
  params: { id: string };
}
/**
 *@method  DELETE
 *@route ~/api/user/profile/:id
 *@description delete user
 *@access private (only user himself can delete  his account)
 * @param reguest
 * @returns user
 */
export async function DELETE(request: NextRequest, { params }: props) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: { comment: true },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const commentIds = user?.comment.map((comment) => comment.id);

    await prisma.comment.deleteMany({
      where: {
        id: {
          in: commentIds,
        },
      },
    });
    const userFromToken = verifyToken(request);

    if (userFromToken !== null && user.id === userFromToken.id) {
      await prisma.user.delete({
        where: { id: parseInt(params.id) },
      });
      return NextResponse.json(
        {
          message: "your profile (account) has been deleted",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "only user himself can delete his account ,forbidden",
      },
      { status: 403 } //forbidden
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "internal server" }, { status: 500 });
  }
}
/**
 *@method  GEt
 *@route ~/api/user/profile/:id
 *@description get profile  user by id
 *@access private (only user himself can git  his account)
 * @param reguest
 * @returns user
 */
export async function GET(request: NextRequest, { params }: props) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
      select: {
        id: true,
        email: true,
        userName: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        {
          message: "you are not allowed , access denied",
        },
        { status: 403 }
      );
    }
    return NextResponse.json({ user }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
/**
 *@method  PUT
 *@route ~/api/user/profile/:id
 *@description update profile
 *@access private (only user himself can update  his account)
 * @param reguest
 * @returns user
 */
export async function PUT(request: NextRequest, { params }: props) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json({
        message: "you are not allowed, access denied",
      });
    }
    const body = (await request.json()) as updateUserDto;
    const validation = updateUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: {
        userName: body.userName,
        email: body.email,
        password: body.password,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...other } = updatedUser;
    return NextResponse.json({ ...other }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
