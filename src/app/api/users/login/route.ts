import { LoginUserDto } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";

import { setCookie } from "@/utils/generateToken";
/**
 *@method  POST
 *@route ~/api/user/login
 *@description login
 *@access Public
 * @param reguest
 * @returns articles
 */
export async function POST(reguest: NextRequest) {
  try {
    const body = (await reguest.json()) as LoginUserDto;
    const validation = loginSchema.safeParse(body);
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
    if (!user) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }
    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    const cookie = setCookie({
      id: user.id,
      isAdmin: user.isAdmin,
      userName: user.userName,
    });

    return NextResponse.json(
      { message: "authenticated" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
