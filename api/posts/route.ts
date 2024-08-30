import { NextRequest, NextResponse } from "next/server";
import { PostSchema } from "@/zod/types";

export async function POST(req: NextRequest) {
  const parsed = PostSchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.errors,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(parsed);
}
