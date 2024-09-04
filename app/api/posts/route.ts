import { NextRequest, NextResponse } from 'next/server';
import { PostSchema } from '@/zod/types';
import { getPost, insertPost, updatePost } from '@/db/query';
import { InsertPost, postsTable, SelectPost } from '@/db/schema';
import { db } from '@/db';
import { FormDataTypes } from '@/components/form-no-zod/Form';

type getPostSchema = {
  id: number;
};

export async function GET(req: NextRequest) {
  const data: getPostSchema = await req.json();

  const postId = data.id;

  if (!postId) {
    return NextResponse.json(
      { error: 'Post ID Not Provided' },
      { status: 400 }
    );
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

// export async function POST(req: NextRequest) {
//   const data: FormDataTypes = await req.json();

//   console.log(data);

//   if (!data) {
//     return NextResponse.json(
//       { error: 'Unknown or invalid data' },
//       { status: 400 }
//     );
//   }

//   try {
//     const { title, subtitle, category, content, userId } = data;

//     const post = await db.insert(postsTable).values({
//       title,
//       subtitle,
//       category,
//       content,
//       userId,
//     });
//     console.log('This is the Post Log!', post);

//     return NextResponse.json(post, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }

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
