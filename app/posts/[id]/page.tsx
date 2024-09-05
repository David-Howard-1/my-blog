import { db } from '@/db';
import { postsTable, usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { playfair_dp } from '@/lib/playfairDisplay';
import { Noto_Serif_Georgian } from 'next/font/google';
import dayjs from 'dayjs';
import { formatDate } from '@/app/utils/formatDate';

const noto_serif_georgian = Noto_Serif_Georgian({ subsets: ['latin'] });

type PostPageProps = {
  params: {
    id: string;
  };
};

const PostPage = async ({ params }: PostPageProps) => {
  // Convert the params.id to a number for db selection
  const id = Number(params.id);

  // Fetch the post data from the database using the provided id
  const postArray = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.id, id));

  const post = postArray[0];

  const authorArray = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, post.userId));

  const author = authorArray[0];

  return (
    <div className="md:p-16 flex flex-col">
      <h1
        className={`${playfair_dp.className} text-5xl md:text-7xl xl:text-8xl font-bold text-center mb-8 p-4 md:p-0`}
      >
        {post.title}
      </h1>
      <h3 className="text-xl md:text-2xl text-center">{post.subtitle}</h3>
      <p className="text-stone-500 text-xs text-center mb-10">
        {formatDate({ date: post.createdAt })} by {author.firstname}{' '}
        {author.lastname}
      </p>
      <section className="mx-auto w-full max-w-4xl">
        <p
          className={`${noto_serif_georgian.className} md:leading-7 indent-10`}
        >
          {post.content}
        </p>
      </section>
    </div>
  );
};

export default PostPage;
