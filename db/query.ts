import { FormData } from '@/zod/types';
import { db } from './index';
import { postsTable } from './schema';

export const insertPost = async (data: FormData) => {
  const post = await db
    .insert(postsTable)
    .values({
      title: data.title,
      subtitle: data.subtitle,
      category: data.category,
      content: data.content,
      userId: 1,
    })
    .returning();

  return post;
};

export const getPosts = async () => {
  await db.get(postsTable);
};
