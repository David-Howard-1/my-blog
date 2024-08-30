import { NextRequest, NextResponse } from 'next/server';
import { PostSchema } from '@/zod/types';
import { insertPost } from '@/db/query';

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

  const post = await insertPost(parsed.data);

  return NextResponse.json(post[0]);
}
