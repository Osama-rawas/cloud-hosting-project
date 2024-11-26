import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { JWTPaylod } from "./types";
// verify token for api token
export function verifyToken(request: NextRequest): JWTPaylod | null {
  try {
    const jwtToken = request.cookies.get("token");
    const token = jwtToken?.value as string;
    if (!token) {
      return null;
    }
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as JWTPaylod;
    return userPayload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
// verify token for api
export function verifyTokenForPage(token: string): JWTPaylod | null {
  try {
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as JWTPaylod;
    if (!userPayload) {
      return null;
    }
    return userPayload;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
