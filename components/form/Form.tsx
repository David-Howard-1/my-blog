import { useForm } from "react-hook-form";
import { FormData } from "@/zod/types";
import FormField from "./FormField";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Handle form submission
    console.log("SUCCESS", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col space-y-3 max-w-xl'>
        <h2 className='font-bold text-2xl'>New Post</h2>
        <FormField
          name='title'
          placeholder='Title'
          type='text'
          register={register}
          error={errors.title}
        />

        <FormField
          name='subtitle'
          placeholder='Subtitle'
          type='text'
          register={register}
          error={errors.subtitle}
        />

        <FormField
          name='category'
          placeholder='Category'
          type='text'
          register={register}
          error={errors.category}
        />

        <FormField
          name='content'
          placeholder='Write your post here...'
          type='text'
          register={register}
          error={errors.content}
        />
        <button
          type='submit'
          className='py-2 px-4 text-white bg-sky-600 rounded-md'
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
