import { NextRequest, NextResponse } from 'next/server';
import { PostSchema } from '@/zod/types';
import { getPost, insertPost, updatePost } from '@/db/query';
import { SelectPost } from '@/db/schema';
import { db } from '@/db';

export async function GET(req: NextRequest) {
  const postId = Number(req.nextUrl.pathname.split('/').pop());

  if (isNaN(postId)) {
    return NextResponse.json({ error: 'Invalid post id' }, { status: 400 });
  }

  const post = await getPost(postId);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

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

export async function PUT(req: NextRequest) {
  // const parsed = PostSchema.safeParse(await req.json());
  const jsonData: SelectPost = await req.json();

  const { id } = jsonData;

  if (!id) {
    return NextResponse.json(
      {
        error: 'Post ID Not Provided',
      },
      { status: 400 }
    );
  }

  const parsed = PostSchema.safeParse(jsonData);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.errors,
      },
      { status: 400 }
    );
  }

  const updatedPost = await updatePost(parsed.data, id);

  console.log(parsed.data, id);

  return NextResponse.json(updatedPost);
}
