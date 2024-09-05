import { NextRequest, NextResponse } from 'next/server';
import { PostSchema } from '@/zod/types';
import { getPost, getPosts, insertPost, updatePost } from '@/db/query';
import { InsertPost, postsTable, SelectPost } from '@/db/schema';
import { db } from '@/db';
import { FormDataTypes } from '@/components/form-no-zod/Form';
import { error } from 'console';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  console.log('Received Post id:', id);

  if (!id) {
    /**
     * Get all posts if an id is not specified
     */
    console.log('Retrieving all Posts...');

    const posts = await getPosts();

    if (!posts || posts.length === 0) {
      return NextResponse.json(
        { error: 'No posts not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(posts);
  } else {
    /**
     * Get one post if an id is specified
     */
    console.log(`Retrieving Post with id: ${id} ...`);

    const post = await getPost(Number(id));

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  }
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
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const parsed = PostSchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.errors,
      },
      { status: 400 }
    );
  }

  const result = await updatePost(parsed.data, Number(id));

  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      {
        error: 'Post id required for deletion',
      },
      { status: 400 }
    );
  }

  const result = await db
    .delete(postsTable)
    .where(eq(postsTable.id, Number(id)));

  return NextResponse.json(result);
}
