import { db } from "@/db";
import { postsTable, SelectPost, SelectUser, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { playfair_dp } from "@/lib/playfairDisplay";
import { formatDate } from "@/app/utils/formatDate";
import { noto_serif } from "@/lib/notoSerif";
import ButtonLink from "@/components/ui/ButtonLink";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";

type PostPageProps = {
  params: {
    id: string;
  };
};

const PostPage = async ({ params }: PostPageProps) => {
  // Convert the params.id to a number for db selection
  const id = Number(params.id);

  const post = await db.query.postsTable.findFirst({
    where: eq(postsTable.id, id),
  });

  if (!post) {
    return <div>Loading post...</div>;
  }

  const author = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, post.userId),
  });

  return (
    <>
      {author?.id === 1 ? (
        <div className='flex space-x-2'>
          <ButtonLink
            href={`/posts/${post.id}/update`}
            className='ml-auto'
            variant='info'
          >
            Edit
          </ButtonLink>
          <Button
            className='ml-auto'
            variant='danger'
            onClick={async () => {
              "use server";

              await db
                .delete(postsTable)
                .where(eq(postsTable.id, post.id))
                .execute();

              console.log(`Post with ID ${post.id} has been deleted`);
            }}
          >
            Delete
          </Button>
        </div>
      ) : null}
      <div className='md:p-16 flex flex-col'>
        <h1
          className={`${playfair_dp.className} text-5xl md:text-7xl xl:text-8xl font-bold text-center mb-8 p-4 md:p-0`}
        >
          {post.title}
        </h1>
        {/* <h3 className="text-xl md:text-2xl text-center">{post.subtitle}</h3> */}
        <p className='text-stone-500 text-sm text-center mb-8'>
          {formatDate({ date: post.createdAt, format: "MMMM D, YYYY" })}
          {author && ` by ${author.firstname} ${author.lastname}`}
        </p>
        <section className='mx-auto w-full max-w-3xl'>
          <p className={`${noto_serif.className} md:leading-7 text-xl`}>
            {post?.content}
          </p>
        </section>
      </div>
    </>
  );
};

export default PostPage;
