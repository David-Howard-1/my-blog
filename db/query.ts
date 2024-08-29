import { FormData } from '@/zod/types';
import { db } from './index';
import { postsTable } from './schema';

export const insertPost = async (data: FormData) => {
  await db.insert(postsTable).values({
    title: data.title,
    subtitle: data.subtitle,
    category: data.category,
    content: data.content,
    userId: 1,
  });
};

export const getPosts = async () => {
  await db.get(postsTable);
};
