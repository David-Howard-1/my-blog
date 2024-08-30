import { db } from '@/db';
import { postsTable } from '@/db/schema';
import { Playfair_Display } from 'next/font/google';

const playfair_dp = Playfair_Display({ subsets: ['latin'] });

const CreatePostsPage = async () => {
  const onSubmit = async () => {
    'use server';

    await db.insert(postsTable).values({
      title: 'The Bible is Not a Behavior Manual',
      subtitle:
        'The Bible is the unified story of God, culminated in Jesus of Nazareth',
      category: 'Biblical Literacy',
      content:
        "The Bible is far more than a manual for behavior; it is a unified story that reveals God's relationship with His people, culminating in the life, death, and resurrection of Jesus. This narrative weaves together the history of God's creation, His covenant with humanity, and His ultimate plan for redemption through Christ. As we engage with the Scriptures, we discover not just rules to live by, but wisdom that shapes our understanding of the world and our place in it. This grand story gives us purpose and direction, grounding our lives in the truth of God's love and grace.",
      userId: 1,
    });
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-6">New Post</h2>
      <form action={onSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Title"
          className={`${playfair_dp.className} border-b hover:border-sky-300 focus:border-sky-400 focus:border-b-[1.5px] max-w-2xl placeholder:text-3xl text-3xl mb-4 p-2`}
        />
        <input
          type="text"
          placeholder="Subtitle"
          className="border-b hover:border-sky-300 focus:border-sky-400 focus:border-b-[1.5px] max-w-xl mb-10 p-2 pl-4"
        />
        <textarea
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

export default CreatePostsPage;
