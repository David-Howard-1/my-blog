import Image from 'next/image';
import Link from 'next/link';
import { playfair_dp } from '../../lib/playfairDisplay';
import { SelectPost } from '@/db/schema';
import { Edit01Icon } from 'hugeicons-react';
import { formatDate } from '@/app/utils/formatDate';

const PostLinkCard = (post: SelectPost) => {
  return (
    <div className="rounded-md w-80 hover:shadow-md hover:bg-stone-100 p-2 transition-all">
      <Link href={`/posts/${post.id}`} className="flex flex-col">
        {/* <Image
        src={post.img}
        alt="Stagnating shame"
        width={500}
        className="mb-2"
      /> */}
        <div className="flex justify-between items-center">
          <p className="px-1 mr-1 my-2 h-fit bg-stone-100 uppercase text-xs max-w-fit text-stone-600">
            {post.category}
          </p>
        </div>
        <h3 className={`${playfair_dp.className} text-3xl font-bold mt-1 mb-3`}>
          {post.title}
        </h3>
        <h4 className="mb-4">{post.subtitle}</h4>
        <p className="text-xs text-stone-600 uppercase">
          {formatDate({ date: post.createdAt, format: 'MMM D, YYYY' })}
        </p>
      </Link>
    </div>
  );
};

export default PostLinkCard;
