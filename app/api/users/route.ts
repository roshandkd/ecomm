import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();

    console.log(email, password);

    const user = await prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });

    return NextResponse.json({ message: "User added successfully", user });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add user", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({});

    return NextResponse.json({ message: "Users List", users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get users", error },
      { status: 500 }
    );
  }
}
