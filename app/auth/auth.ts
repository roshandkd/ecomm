import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = "123bhhbk3b3";

export const generateToken = (email: string) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getAuthStatus = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token ? verifyToken(token) : null;
};
