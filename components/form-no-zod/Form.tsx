import { postsTable } from '@/db/schema';
import { db } from '@/db';
import { playfair_dp } from '@/lib/playfairDisplay';
import FormField from './FormField';

export type FormDataTypes = {
  title: string;
  subtitle: string;
  category: string;
  content: string;
  userId: number;
};

const Form = () => {
  const onSubmit = async (formData: FormData) => {
    'use server';

    const title = formData.get('title')?.toString() || '';
    const subtitle = formData.get('subtitle')?.toString() || '';
    const category = formData.get('category')?.toString() || '';
    const content = formData.get('content')?.toString() || '';

    if (!title || !subtitle || !category || !content) {
      return new Error('Missing required values');
    }

    await db.insert(postsTable).values({
      title,
      subtitle,
      category,
      content,
      userId: 1,
    });
  };

  return (
    <>
      <form action={onSubmit} className="flex flex-col">
        <FormField
          type="text"
          name="title"
          placeholder="Title"
          className={`${playfair_dp.className} border-b hover:border-sky-300 focus:border-sky-400 focus:border-b-[1.5px] max-w-2xl placeholder:text-3xl text-3xl mb-4 p-2`}
        />
        <FormField
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          className="border-b hover:border-sky-300 focus:border-sky-400 focus:border-b-[1.5px] max-w-xl mb-10 p-2 pl-4"
        />
        <FormField
          type="text"
          name="category"
          placeholder="Category"
          className="border-b hover:border-sky-300 focus:border-sky-400 focus:border-b-[1.5px] max-w-xl mb-10 p-2 pl-4"
        />
        <FormField
          textarea
          name="content"
          placeholder="Write your post here"
          className="text-input max-w-6xl min-h-64 resize-none rounded-md px-4 p-2"
        />
        <button type="submit" className="btn-primary max-w-16 mt-10">
          Post
        </button>
      </form>
    </>
  );
};

export default Form;
