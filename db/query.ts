import { FormData } from '@/zod/types';
import { db } from './index';
import { postsTable, usersTable } from './schema';
import { eq } from 'drizzle-orm';

export const insertPost = async (data: FormData) => {
  // Parse the data by destructuring
  const { title, subtitle, category, content } = data;

  const post = await db
    .insert(postsTable)
    .values({
      // insert the parsed data
      title: title,
      subtitle: subtitle,
      category: category,
      content: content,
      userId: 1,
    })
    .returning();

  return post;
};

export const updatePost = async (data: FormData, id: number) => {
  return await db.update(postsTable).set(data).where(eq(postsTable.id, id));
};

export const getPosts = async () => {
  return await db.query.postsTable.findMany();
};

export const getPost = async (id: number) => {
  const post = await db.query.postsTable.findFirst({
    where: eq(postsTable.id, id),
  });

  return post;
};

export const getUsers = async () => {
  return await db.query.usersTable.findMany();
};

export const getUser = async (id: number) => {
  return await db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  });
};
