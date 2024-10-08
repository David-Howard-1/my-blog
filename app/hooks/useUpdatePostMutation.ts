import { InsertPost } from '@/db/schema';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUpdatePostMutation() {
  async function mutationFn(data: InsertPost) {
    console.log(data.id);
    try {
      const res = await fetch(`/api/posts?id=${String(data.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      console.log(res.json());

      if (res.status === 200) {
        type TPost = {
          id: number;
        };
        const payload = (await res.json()) as TPost;
        console.log(payload);

        return payload;
      } else if (res.status === 404) {
        throw new Error('API Route not found');
      } else {
        throw new Error('Failed to update post');
      }
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
