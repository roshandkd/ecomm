import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/prisma";
export async function GET(req: NextRequest) {
  try {
    const cookies = req.cookies;
    const token = cookies.get("token");
    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    const JWT_SECRET = process.env.JWT_SECRET || "";

    const decoded = jwt.verify(token.value, JWT_SECRET) as JwtPayload;
    const email = decoded.email || "";
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return NextResponse.json({ message: "Authenticated", decoded, user });
  } catch (error) {
    console.log("Error in token verification:", error);
    return NextResponse.json(
      { message: "Server error", error: error },
      { status: 500 }
    );
  }
}
