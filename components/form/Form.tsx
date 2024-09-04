'use client';

import { useForm } from 'react-hook-form';
import { FormData, PostSchema } from '@/zod/types';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from './FormField';
import { playfair_dp } from '@/lib/playfairDisplay';
import { useInsertPostMutation } from '@/app/hooks/useInsertPostMutation';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useUpdatePostMutation } from '@/app/hooks/useUpdatePostMutation';
import { useState } from 'react';
import { usePostQuery } from '@/app/hooks/usePostQuery';
import { SelectPost } from '@/db/schema';

type FormProps = {
  params?: {
    id: number;
  };
};

const Form: FC<FormProps> = () => {
  /**
   * Hooks
   */
  const router = useRouter();
  const params = useParams();

  const [initialFormData, setInitialFormData] = useState<FormData>();

  const postId = params?.id;

  console.log('URL Params:', postId);

  // Set the initial form data if updating an existing post
  useEffect(() => {
    if (postId) {
      const fetchPostToUpdate = async () => {
        let res = await fetch(`/api/posts?id=${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        let post: SelectPost = await res.json();
        setInitialFormData({
          title: post.title,
          subtitle: post.subtitle,
          category: post.category,
          content: post.content,
        });
      };

      fetchPostToUpdate();
    }
  }, [postId]);
  console.log('Initial form data:', initialFormData);

  // React Hook Form useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(PostSchema),
    values: {
      title: initialFormData?.title || '',
      subtitle: initialFormData?.subtitle || '',
      category: initialFormData?.category || '',
      content: initialFormData?.content || '',
    },
  });

  const { mutateAsync, isPending } = useInsertPostMutation();

  const insertMutateAsync = useInsertPostMutation().mutateAsync;
  const insertIsPending = useInsertPostMutation().isPending;

  const updateMutateAsync = useUpdatePostMutation().mutateAsync;
  const updateIsPending = useUpdatePostMutation().isPending;

  const onSubmit = async (data: FormData) => {
    // Handle form submission
    console.log('VALIDATED DATA: ', data);

    const res = await toast.promise(
      !postId
        ? insertMutateAsync({
            title: data.title,
            subtitle: data.subtitle,
            category: data.category,
            content: data.content,
            userId: 1,
          })
        : updateMutateAsync({
            title: data.title,
            subtitle: data.subtitle,
            category: data.category,
            content: data.content,
            userId: 1,
          }),
      {
        loading: !postId ? 'Submitting Post...' : 'Updating Post...',
        success: !postId
          ? 'Post submitted successfully!'
          : 'Post updated successfully!',
        error: !postId ? 'Unable to submit Post' : 'Unable to update Post',
      }
    );

    if (res?.id) {
      router.replace(`/posts/${res.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-3 max-w-xl">
        {/* <div>isPending: {JSON.stringify(isPending)}</div> */}
        <h2 className="font-bold text-2xl">New Post</h2>
        <FormField
          name="title"
          placeholder="Title"
          type="text"
          register={register}
          error={errors.title}
          noStyle
          className={`${playfair_dp.className} text-4xl`}
        />

        <FormField
          name="subtitle"
          placeholder="Subtitle"
          type="text"
          register={register}
          error={errors.subtitle}
          noStyle
          className="font-semibold"
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
          type="number"
          register={register}
          error={errors.content}
        />
        {/* <div className='space-x-2 ml-auto'>
          <button
            type='submit'
            className='py-2 px-4 max-w-40 ml-auto text-amber-600  rounded-md hover:outline outline-amber-600 hover:outline-1 outline-offset-1 active:shadow-inner active:bg-amber-700/10 active:outline-offset-0'
          >
            Save as Draft
          </button> */}
        <button
          type="submit"
          className="py-2 px-4 max-w-40 ml-auto text-white bg-amber-600 rounded-md hover:outline outline-amber-400 hover:outline-1 outline-offset-1 active:shadow-inner active:bg-amber-700/80 active:outline-offset-0"
        >
          {!postId ? 'Submit' : 'Save Changes'}
        </button>
      </div>
      {/* </div> */}
    </form>
  );
};

export default Form;
