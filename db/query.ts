import { FormData } from "@/zod/types";
import { db } from "./index";
import { postsTable } from "./schema";

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

export const updatePost = async (data: FormData) => {
  // const post = await db.update(postsTable).set()
};

export const getPosts = async () => {
  await db.get(postsTable);
};
