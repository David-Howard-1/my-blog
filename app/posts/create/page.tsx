import Form from '@/components/form-no-zod/Form';
import { db } from '@/db';
import { postsTable } from '@/db/schema';
import { Playfair_Display } from 'next/font/google';

const playfair_dp = Playfair_Display({ subsets: ['latin'] });

const CreatePostsPage = async () => {
  

  return (
    <>
      <h2 className="text-xl font-bold mb-6">New Post</h2>
      <Form />
    </>
  );
};

export default CreatePostsPage;
