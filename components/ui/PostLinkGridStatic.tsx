import PostLinkCard from './PostLinkCard';
import { Posts } from '@/data';
import PostLinkCardStatic from './PostLinkCardStatic';


const PostLinkGridStatic = async () => {
  const posts = Posts;

  return (
    <div className="grid grid-cols-3 gap-10">
      {posts.map((post) => (
        <PostLinkCardStatic
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
};

export default PostLinkGridStatic;
