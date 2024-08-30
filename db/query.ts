import { FormData, PostSchema } from "@/zod/types";
import { db } from "./index";
import { InsertPost, postsTable } from "./schema";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { z } from "zod";

export function useInsertPostMutation() {
  async function mutationFn(data: InsertPost) {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        const payload = (await res.json()) as z.infer<typeof PostSchema>;
        console.log(payload);
      } else {
        throw new Error("Failed to insert post");
      }

      // await db.insert(postsTable).values({
      //   title: data.title,
      //   subtitle: data.subtitle,
      //   category: data.category,
      //   content: data.content,
      //   userId: 1,
      // });
    } catch (error) {
      console.error(error);
    }
  }

  return useMutation({
    mutationFn: mutationFn,
    onError(error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }
      toast.error("Something went wrong");
    },
  });
}

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
