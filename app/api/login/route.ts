import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 401 }
      );
    }
    if (password !== user.password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }
    const JWT_SECRET = process.env.JWT_SECRET || "";
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    // Set the token as HttpOnly cookie
    const response = NextResponse.json({
      message: "Login Successful",
      user,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use `true` in production for HTTPS
      maxAge: 3600, // 1 hour
      path: "/",
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to login user", error },
      { status: 500 }
    );
  }
}
