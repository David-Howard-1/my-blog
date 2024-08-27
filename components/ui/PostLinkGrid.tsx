import PostLinkCard from './PostLinkCard';
import { Posts } from '@/data';

const PostLinkGrid = () => {
  const posts = Posts;

  return (
    <div className="grid grid-cols-3 gap-10">
      {posts.map((post) => (
        <PostLinkCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostLinkGrid;
