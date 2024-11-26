import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
/**
 *@method  GET
 *@route ~/api/user/logout
 *@description logout user
 *@access Public
 * @param reguest
 * @returns articles
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GET(request: NextRequest) {
  try {
    cookies().delete("token");
    return NextResponse.json({ message: "logout" }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "intrenal server error " },
      {
        status: 500,
      }
    );
  }
}
