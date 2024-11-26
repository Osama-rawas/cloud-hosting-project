import prisma from "@/utils/db";
import { RegisterUserDto } from "@/utils/dtos";
import { registerSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";

/**
 *@method  POST
 *@route ~/api/user/register
 *@description create new user
 *@access Public
 * @param reguest
 * @returns articles
 */
export async function POST(register: NextRequest) {
  try {
    const body = (await register.json()) as RegisterUserDto;
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (user) {
      return NextResponse.json(
        { message: "this user is already registered" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, salt);
    const newUser = await prisma.user.create({
      data: {
        userName: body.userName,
        email: body.email,
        password: hashPassword,
      },
      select: {
        userName: true,
        id: true,
        isAdmin: true,
      },
    });

    const cookie = setCookie({
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      userName: newUser.userName,
    });
    return NextResponse.json(
      { ...newUser, message: "registered & authenticated" },
      { status: 201, headers: { "Set-Cookie": cookie } }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
