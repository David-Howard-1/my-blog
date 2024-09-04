import { FormData } from "@/zod/types";
import { db } from "./index";
import { postsTable } from "./schema";
import { eq } from "drizzle-orm";

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

export const updatePost = async (data: FormData, id: number) => {
  const post = await db
    .update(postsTable)
    .set(data)
    .where(eq(postsTable.id, id));

  return post;
};

export const getPosts = async () => {
  await db.query.postsTable.findMany();
};

export const getPost = async (id: number) => {
  const post = await db.query.postsTable.findFirst({
    where: eq(postsTable.id, id),
  });

  return post;
};
