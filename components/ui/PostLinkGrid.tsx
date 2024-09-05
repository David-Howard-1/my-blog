import { db } from '@/db';
import PostLinkCard from './PostLinkCard';
import { SelectPost } from '@/db/schema';

interface IPostLinkGrid {
  posts: SelectPost[];
}

const PostLinkGrid = ({ posts }: IPostLinkGrid) => {
  // const posts = await db.query.postsTable.findMany();
  // const posts = data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
      {posts.map((post) => (
        <PostLinkCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostLinkGrid;
