import Jwt from "jsonwebtoken";
import { JWTPaylod } from "./types";
import { serialize } from "cookie";

// generate token
export function generateJWT(jwtPayload: JWTPaylod): string {
  const privateKey = process.env.JWT_SECRET as string;
  const token = Jwt.sign(jwtPayload, privateKey, {
    expiresIn: "30d",
  });
  return token;
}
//set cookie with jwt
export function setCookie(jwtPayload: JWTPaylod): string {
  const token = generateJWT(jwtPayload);
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", //development = =http ,production= https
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, //30 DAYS
  });
  return cookie;
}
