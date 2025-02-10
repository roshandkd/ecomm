import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/prisma";

export const verifyToken = async (token = "") => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "";

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const email = decoded.email || "";
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return { user, isAuthenticated: true };
  } catch (error) {
    console.log("error>>", error);
    return { user: null, isAuthenticated: false };
  }
};

export const getAuthStatus = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token ? verifyToken(token) : { user: null, isAuthenticated: false };
};
