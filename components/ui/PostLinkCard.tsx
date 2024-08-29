import Image from 'next/image';
import Link from 'next/link';
import { playfair_dp } from '../playfairDisplay';
import { SelectPost } from '@/db/schema';

const PostLinkCard = (post: SelectPost) => {
  return (
    <Link href={'/'} className="rounded-sm flex flex-col w-80">
      {/* <Image
        src={post.img}
        alt="Stagnating shame"
        width={500}
        className="mb-2"
      /> */}
      <p className="px-1 mr-1 my-2 bg-stone-100 uppercase text-xs max-w-fit text-stone-600">
        {post.category}
      </p>
      <h3 className={`${playfair_dp.className} text-3xl font-bold mt-1 mb-3`}>
        {post.title}
      </h3>
      <h4 className="mb-4">{post.subtitle}</h4>
      <p className="text-xs text-stone-600">{post.createdAt}</p>
    </Link>
  );
};

export default PostLinkCard;
