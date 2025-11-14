import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, password, specialization, bio, contact } = data;

    // Check existing
    const exists = await prisma.doctor.findUnique({
      where: { email },  // VALID after prisma generate
    });

    if (exists) {
      return NextResponse.json(
        { error: "Doctor already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await prisma.doctor.create({
      data: {
        name,
        email,
        password: hashedPassword,
        specialization,
        bio,
        contact,
      },
    });

    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
