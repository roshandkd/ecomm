import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
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
    const decoded = jwt.verify(token.value, "123bhhbk3b3");
    return NextResponse.json({ message: "Authenticated", decoded });
  } catch (error) {
    console.log("Error in token verification:", error);
    return NextResponse.json(
      { message: "Server error", error: error },
      { status: 500 }
    );
  }
}
