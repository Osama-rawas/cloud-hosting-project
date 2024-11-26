/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
/**
 *@method GET
 *@route ~/api/articles/count
 *@description get count Articles
 *@access Public
 * @param reguest
 * @returns articles
 */
export async function GET(reguest: NextRequest) {
  try {
    const articlesCount = await prisma.article.count();
    return NextResponse.json({ articlesCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "internal server error",
      },
      { status: 500 }
    );
  }
}
