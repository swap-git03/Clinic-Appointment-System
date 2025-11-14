// src/app/api/test/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany();
    return NextResponse.json(doctors);
  } catch (error) {
    console.error('API /api/test error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
