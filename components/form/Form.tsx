"use client";

import { useForm } from "react-hook-form";
import { PostFormData, PostSchema } from "@/zod/types";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import { playfair_dp } from "@/lib/playfairDisplay";
import { useInsertPostMutation } from "@/app/hooks/useInsertPostMutation";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useUpdatePostMutation } from "@/app/hooks/useUpdatePostMutation";
import { useState } from "react";
import { SelectPost } from "@/db/schema";
import { BiBold, BiItalic, BiUnderline } from "react-icons/bi";

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

  const postId = params?.id;

  console.log("URL Params:", postId);

  // Set the initial form data if updating an existing post
  useEffect(() => {
    if (postId) {
      const fetchPostToUpdate = async () => {
        let res = await fetch(`/api/posts?id=${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
  console.log("Initial form data:", initialFormData);

  // React Hook Form useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setError,
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    values: {
      title: initialFormData?.title || "",
      subtitle: initialFormData?.subtitle || "",
      category: initialFormData?.category || "",
      content: initialFormData?.content || "",
    },
  });

  const insertMutateAsync = useInsertPostMutation().mutateAsync;
  const insertIsPending = useInsertPostMutation().isPending;

  const updateMutateAsync = useUpdatePostMutation().mutateAsync;
  const updateIsPending = useUpdatePostMutation().isPending;

  const onSubmit = async (data: PostFormData) => {
    // Handle form submission
    console.log("VALIDATED DATA: ", data);

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
        loading: !postId ? "Submitting Post..." : "Updating Post...",
        success: !postId
          ? "Post submitted successfully!"
          : "Post updated successfully!",
        error: !postId ? "Unable to submit Post" : "Unable to update Post",
      }
    );

    if (res?.id) {
      console.log("Replacing URL...");
      router.replace(`/posts/${res.id}`);
    } else if (postId) {
      console.log("Replacing URL...");
      router.replace(`/posts/${postId}`);

      console.log("Refreshing for new data...");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col space-y-2'>
        {/* <div>isPending: {JSON.stringify(isPending)}</div> */}
        <h2 className='text-xl'>{postId ? "Update Post" : "New Post"}</h2>

        <FormField
          name='title'
          placeholder='Title'
          type='text'
          register={register}
          error={errors.title}
          className={`max-w-2xl`}
        />

        <FormField
          name='subtitle'
          placeholder='Subtitle'
          type='text'
          register={register}
          error={errors.subtitle}
          className='max-w-2xl'
        />

        <FormField
          name='category'
          placeholder='Category'
          type='text'
          register={register}
          error={errors.category}
          className='max-w-2xl'
        />

        <div className='max-w-6xl'>
          <div className='border border-b-0 rounded-md rounded-b-none p-1 px-2.5 flex justify-start space-x-2 items-center'>
            <BiBold
              size={20}
              className='hover:text-black/70 active:text-black/50 cursor-pointer'
            />
            <BiItalic
              size={20}
              className='hover:text-black/70 active:text-black/50 cursor-pointer'
            />
            <BiUnderline
              size={20}
              className='hover:text-black/70 active:text-black/50 cursor-pointer'
            />
            <span className='font-bold px-1 hover:text-black/70 active:text-black/50 cursor-pointer text-2xl text-center'>
              Heading
            </span>
            <span className='font-bold px-1 hover:text-black/70 active:text-black/50 text-lg cursor-pointer text-center'>
              Subheading
            </span>
            <span className='font-semibold px-1 hover:text-black/70 active:text-black/50 cursor-pointer text-center'>
              Normal
            </span>
          </div>
          <FormField
            textarea
            name='content'
            placeholder='Write your post here...'
            type='number'
            register={register}
            error={errors.content}
            className='rounded-t-none'
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
          type='submit'
          className={`py-2 px-4 max-w-40 ml-auto text-white font-semibold ${
            insertIsPending || updateIsPending
              ? "bg-gray-100 text-gray-600"
              : "bg-amber-600 rounded-md hover:outline outline-amber-400 hover:outline-1 outline-offset-1 active:shadow-inner active:bg-amber-700/80 active:outline-offset-0"
          } `}
        >
          {!postId ? "Submit" : "Save Changes"}
        </button>
      </div>
      {/* </div> */}
    </form>
  );
};

export default Form;
