import React, { FC } from 'react';
import { db } from '@/db';

type PostPageProps = {
  params: {
    id: string;
  };
};

const PostPage: FC<PostPageProps> = async ({ params }) => {
  const post = db.query.postsTable.findFirst();

  return (
    <div>
      <h2>{params.id}</h2>
    </div>
  );
};

export default PostPage;
