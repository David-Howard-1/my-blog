import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { Playfair_Display } from "next/font/google";

const playfair_dp = Playfair_Display({ subsets: ["latin"] });

const CreatePostsPage = async () => {
  const onSubmit = async () => {
    "use server";

    await db.insert(postsTable).values({
      title: "Prayer as Intimacy",
      subtitle: 'Jesus opens the Lord\'s prayer with "Our Father"',
      category: "Spiritual Formation",
      content:
        "Christian prayer is more than just presenting petitions; it is a profound connection with God that transcends mere requests. Through prayer, believers enter into a relationship with God, sharing not only their needs but also their hearts, thoughts, and emotions. It is a time of communion, where one can listen for God's voice and experience His presence in a deeply personal way. This connection transforms prayer from a simple act of asking into a dynamic conversation that nurtures the soul and strengthens the believer's faith.",
      userId: 1,
    });
  };

  return (
    <>
      <h2 className='text-xl font-bold mb-6'>New Post</h2>
      <form action={onSubmit} className='flex flex-col'>
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
