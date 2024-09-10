'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostFormData, PostSchema } from '@/zod/types';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from './FormField';
import { useInsertPostMutation } from '@/app/hooks/useInsertPostMutation';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { useUpdatePostMutation } from '@/app/hooks/useUpdatePostMutation';
import { SelectPost } from '@/db/schema';
import { noto_serif } from '@/lib/notoSerif';
import FormatBar from './FormatBar';

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
  const [initialFormData, setInitialFormData] = useState<PostFormData>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    values: {
      title: initialFormData?.title || '',
      subtitle: initialFormData?.subtitle || '',
      category: initialFormData?.category || '',
      content: initialFormData?.content || '',
    },
  });

  const insertMutateAsync = useInsertPostMutation().mutateAsync;
  const insertIsPending = useInsertPostMutation().isPending;

  const updateMutateAsync = useUpdatePostMutation().mutateAsync;
  const updateIsPending = useUpdatePostMutation().isPending;

  const onSubmit = async (data: PostFormData) => {
    // Handle form submission
    console.log('VALIDATED DATA: ', data);

    const res = await toast.promise(
      !postId
        ? // With no postId, insert a posts record using the form data
          insertMutateAsync({
            title: data.title,
            subtitle: data.subtitle,
            category: data.category,
            content: data.content,
            userId: 1, // ! Change this value when authentication is built
          })
        : // With a postId, update the existing posts record using the form data
          updateMutateAsync({
            id: Number(postId),
            title: data.title,
            subtitle: data.subtitle,
            category: data.category,
            content: data.content,
            userId: 1, // ! Change this value when authentication is built
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
      console.log('Replacing URL...');
      router.replace(`/posts/${res.id}`);
    } else if (postId) {
      console.log('Replacing URL...');
      router.replace(`/posts/${postId}`);

      console.log('Refreshing for new data...');
      router.refresh();
    }
  };

  const highlightLogger = () => {
    console.log('Highlight finished...');

    const textarea = textareaRef.current;

    if (textarea) {
      // Get the selected text from the textarea element/input
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);

      // Check if anything is selected
      if (selectedText) {
        console.log('Highlighted Text: ' + selectedText);
      }
    } else {
      console.log('Highlighted text not captured');
    }

    // const selectedText = window.getSelection()?.toString();

    // if (selectedText) {
    //   console.log('Highlighted Text:', selectedText);
    // } else {
    //   console.log('No highlighted text captured');
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-2">
        {/* <div>isPending: {JSON.stringify(isPending)}</div> */}
        <h2 className="text-xl">{postId ? 'Update Post' : 'New Post'}</h2>

        <FormField
          name="title"
          placeholder="Title"
          type="text"
          register={register}
          error={errors.title}
          className="max-w-2xl"
        />

        <FormField
          name="subtitle"
          placeholder="Subtitle"
          type="text"
          register={register}
          error={errors.subtitle}
          className="max-w-2xl"
        />

        <FormField
          name="category"
          placeholder="Category"
          type="text"
          register={register}
          error={errors.category}
          className="max-w-2xl"
        />

        <div className="max-w-6xl">
          <FormatBar />

          <FormField
            textarea
            onSelect={highlightLogger}
            name="content"
            placeholder="Write your post here..."
            type="number"
            register={register}
            error={errors.content}
            className={`${noto_serif.className} rounded-t-none`}
          />
        </div>
        {/* <div className='space-x-2 ml-auto'>
          <button
            type='submit'
            className='py-2 px-4 max-w-40 ml-auto text-amber-600  rounded-md hover:outline outline-amber-600 hover:outline-1 outline-offset-1 active:shadow-inner active:bg-amber-700/10 active:outline-offset-0'
          >
            Save as Draft
          </button> */}
        <button
          type="submit"
          className={`py-2 px-4 max-w-40 ml-auto text-white font-semibold ${
            insertIsPending || updateIsPending
              ? 'bg-gray-100 text-gray-600'
              : 'bg-amber-600 rounded-md hover:outline outline-amber-400 hover:outline-1 outline-offset-1 active:shadow-inner active:bg-amber-700/80 active:outline-offset-0'
          } `}
        >
          {!postId ? 'Submit' : 'Save Changes'}
        </button>
      </div>
      {/* </div> */}
    </form>
  );
};

export default Form;
