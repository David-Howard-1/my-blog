"use client";

import { useForm } from "react-hook-form";
import { FormData, PostSchema } from "@/zod/types";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import { playfair_dp } from "../playfairDisplay";
import { useInsertPostMutation } from "@/app/hooks/useInsertPostMutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useUpdatePostMutation } from "@/app/hooks/useUpdatePostMutation";
import { useState } from "react";

type FormProps = {
  params?: {
    id: number;
  };
};

const Form: FC<FormProps> = ({ params: id }) => {
  const [intialFormData, setInitialFormData] = useState({});
  const router = useRouter();

  const postId = id;

  // Set the initial form data if updating an existing post
  const getInitialFormData = async () => {
    const res = await fetch(`api/posts/${String(postId)}`);
    console.log("API GET POST FETCH: ", res.json());

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    return res.json();
  };

  if (postId) {
    getInitialFormData();
  }

  // React Hook Form useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(PostSchema),
  });

  const { mutateAsync, isPending } = useInsertPostMutation();

  const insertMutateAsync = useInsertPostMutation().mutateAsync;
  const insertIsPending = useInsertPostMutation().isPending;

  const updateMutateAsync = useUpdatePostMutation().mutateAsync;
  const updateIsPending = useUpdatePostMutation().isPending;

  const onSubmit = async (data: FormData) => {
    // Handle form submission
    console.log("VALIDATED DATA: ", data);

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
        loading: !postId ? "Submitting Post..." : "Updating Post...",
        success: !postId
          ? "Post submitted successfully!"
          : "Post updated successfully!",
        error: !postId ? "Unable to submit Post" : "Unable to update Post",
      }
    );

    if (res?.id) {
      router.replace(`/posts/${res.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col space-y-3 max-w-xl'>
        {/* <div>isPending: {JSON.stringify(isPending)}</div> */}
        <h2 className='font-bold text-2xl'>New Post</h2>
        <FormField
          name='title'
          placeholder='Title'
          type='text'
          register={register}
          error={errors.title}
          noStyle
          className={`${playfair_dp.className} text-4xl`}
        />

        <FormField
          name='subtitle'
          placeholder='Subtitle'
          type='text'
          register={register}
          error={errors.subtitle}
          noStyle
          className='font-semibold'
        />

        <FormField
          name='category'
          placeholder='Category'
          type='text'
          register={register}
          error={errors.category}
        />

        <FormField
          textarea
          name='content'
          placeholder='Write your post here...'
          type='number'
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
          type='submit'
          className='py-2 px-4 max-w-40 ml-auto text-white bg-amber-600 rounded-md hover:outline outline-amber-400 hover:outline-1 outline-offset-1 active:shadow-inner active:bg-amber-700/80 active:outline-offset-0'
        >
          Submit
        </button>
      </div>
      {/* </div> */}
    </form>
  );
};

export default Form;
