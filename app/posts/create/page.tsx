import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { playfair_dp } from "@/components/playfairDisplay";

const CreatePostsPage = () => {
  const onSubmit = async () => {
    "use server";
    await db.insert(postsTable).values({
      title: "Should and Should Not",
      subtitle:
        "How unrealistic expectations inhibit our God-given individuality",
      category: "Emotional Health",
      content: "The body of the post",
      userId: 1,
    });
  };

  return (
    <>
      <h2 className='text-xl font-bold mb-6'>New Post</h2>
      <form
        action={async () => {
          "use server";

          await db.insert(postsTable).values({
            title: "Should and Should Not",
            subtitle:
              "How unrealistic expectations inhibit our God-given individuality",
            category: "Emotional Health",
            content: "The body of the post",
            userId: 1,
          });
        }}
        className='flex flex-col'
      >
        <input
          type='text'
          placeholder='Title'
          className={`${playfair_dp.className} border-b hover:border-sky-300 focus:border-sky-400 focus:border-b-[1.5px] max-w-2xl placeholder:text-3xl text-3xl mb-4 p-2`}
        />
        <input
          type='text'
          placeholder='Subtitle'
          className='border-b hover:border-sky-300 focus:border-sky-400 focus:border-b-[1.5px] max-w-xl mb-10 p-2 pl-4'
        />
        <textarea
          placeholder='Write your post here'
          className='text-input max-w-6xl min-h-64 resize-none rounded-md px-4 p-2'
        />
        <button type='submit' className='btn-primary max-w-16 mt-10'>
          Post
        </button>
      </form>
    </>
  );
};

export default CreatePostsPage;
