import { FormData } from '@/zod/types';
import { db } from './index';
import { InsertPost, postsTable } from './schema';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useInsertPostMutation() {
  async function mutationFn(data: InsertPost) {
    try {
      await db.insert(postsTable).values({
        title: data.title,
        subtitle: data.subtitle,
        category: data.category,
        content: data.content,
        userId: 1,
      });
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
      toast.error('Something went wrong');
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
