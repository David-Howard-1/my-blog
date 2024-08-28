import { db } from '@/db';
import PostLinkCard from './PostLinkCard';
import { Posts } from '@/data';


const PostLinkGrid = async () => {
  // const posts = Posts;
  const posts = await db.query.postsTable.findMany();

  return (
    <div className="grid grid-cols-3 gap-10">
      {posts.map((post) => (
        <PostLinkCard
          key={post.id}
          {...post}
        />
      ))}
    </div>
  );
};

export default PostLinkGrid;
