import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const exists = await prisma.patient.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "Patient exists" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  const patient = await prisma.patient.create({
    data: {
      name,
      email,
      password: hashed,
    },
  });

  return NextResponse.json({ message: "Patient created", patient });
}
