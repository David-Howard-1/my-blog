import { db } from '@/db';
import { postsTable, usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { playfair_dp } from '@/lib/playfairDisplay';
import { formatDate } from '@/app/utils/formatDate';
import Link from 'next/link';
import { noto_serif } from '@/lib/notoSerif';

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
    <>
      {author.id === 1 ? (
        <Link
          href={`/posts/${post.id}/update`}
          className="ml-auto px-2 p-1 rounded border border-amber-500 text-amber-500 text-sm min-w-20 text-center hover:bg-amber-500/10 active:bg-amber-500/20 active:shadow-inner"
        >
          Edit
        </Link>
      ) : null}
      <div className="md:p-16 flex flex-col">
        <h1
          className={`${playfair_dp.className} text-5xl md:text-7xl xl:text-8xl font-bold text-center mb-8 p-4 md:p-0`}
        >
          {post.title}
        </h1>
        {/* <h3 className="text-xl md:text-2xl text-center">{post.subtitle}</h3> */}
        <p className="text-stone-500 text-sm text-center mb-8">
          {formatDate({ date: post.createdAt, format: 'MMMM D, YYYY' })} by{' '}
          {author.firstname} {author.lastname}
        </p>
        <section className="mx-auto w-full max-w-3xl">
          <p className={`${noto_serif.className} md:leading-7 text-xl`}>
            {post.content}
          </p>
        </section>
      </div>
    </>
  );
};

export default PostPage;
