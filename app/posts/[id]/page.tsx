import React, { FC } from "react";
import { db } from "@/db";
import { postsTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { playfair_dp } from "@/components/playfairDisplay";

type PostPageProps = {
  params: {
    id: string;
  };
};

const PostPage: FC<PostPageProps> = async ({ params }) => {
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
    <div>
      <div className='p-20'>
        <h2
          className={`${playfair_dp.className} text-7xl font-bold text-center mb-8`}
        >
          {post.title}
        </h2>
        <div className='flex text-sm justify-center items-center mb-5 uppercase'>
          <p>
            {post.createdAt} by{" "}
            <p className='inline'>
              {author.firstname} {author.lastname}
            </p>
          </p>
        </div>
        <h3 className='text-2xl text-center'>{post.subtitle}</h3>
      </div>
    </div>
  );
};

export default PostPage;
