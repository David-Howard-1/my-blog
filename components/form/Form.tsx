'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FormData, PostSchema } from '@/zod/types';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from './FormField';
import { playfair_dp } from '../playfairDisplay';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query';
import { getPosts, insertPost, useInsertPostMutation } from '@/db/query';

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(PostSchema),
  });

  // const { mutateAsync, isPending } = useInsertPostMutation();

  const onSubmit = async (data: FormData) => {
    // Handle form submission
    console.log('VALIDATED DATA: ', data);
    // alert('Form validated successfully');

    // try {
    //   await mutateAsync({
    //     title: data.title,
    //     subtitle: data.subtitle,
    //     category: data.category,
    //     content: data.content,
    //     userId: 1,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-3 max-w-xl">
        <h2 className="font-bold text-2xl">New Post</h2>
        <FormField
          name="title"
          placeholder="Title"
          type="text"
          register={register}
          error={errors.title}
          className={`${playfair_dp.className} text-4xl`}
        />

        <FormField
          name="subtitle"
          placeholder="Subtitle"
          type="text"
          register={register}
          error={errors.subtitle}
          className=""
        />

        <FormField
          name="category"
          placeholder="Category"
          type="text"
          register={register}
          error={errors.category}
        />

        <FormField
          textarea
          name="content"
          placeholder="Write your post here..."
          type="text"
          register={register}
          error={errors.content}
        />
        <button
          type="submit"
          className="py-2 px-4 max-w-40 ml-auto text-white bg-amber-600 rounded-md hover:outline outline-amber-400 hover:outline-1 outline-offset-1 active:shadow-inner active:bg-amber-700/80 active:outline-offset-0"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
