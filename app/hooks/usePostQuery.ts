import { SelectPost } from '@/db/schema';
import { useQuery } from '@tanstack/react-query';

export function usePostQuery() {
  async function queryFn(id: number) {
    try {
      const res = await fetch(`api/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });

      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

//   return useQuery({
//     queryFn: queryFn,
//   });
}
