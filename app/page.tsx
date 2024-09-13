import Header from '@/components/layout/Header';
import RefreshCache from '@/components/RefreshCache';
import PostLinkGrid from '@/components/ui/PostLinkGrid';
import PostLinkGridStatic from '@/components/ui/PostLinkGridStatic';
import ToolTip from '@/components/ui/ToolTip';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';

export default async function Home() {
  const posts = await db.query.postsTable.findMany();

  const postsLength = posts.length;
  console.log('Posts array Length:', postsLength);

  const checkPostsChange = async () => {
    'use server';

    const checkPosts = await db.query.postsTable.findMany();
    const checkPostsLength = checkPosts.length;
    console.log('CHECK Posts array Length:', checkPostsLength);

    const didChange = postsLength !== checkPostsLength;
    console.log('didChange?', didChange);

    if (didChange) {
      revalidatePath('/');
    }
  };

  // checkPostsChange();

  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  });

  revalidatePath('/');

  return (
    <main className="min-h-screen">
      {/* <RefreshCache check={checkPostsChange} /> */}
      {/* <h1 className="font-bold tracking-tight text-8xl mb-5">
          Journey with Jesus
        </h1> */}
      <Header className="border-b">
        <h1 className="font-bold tracking-tight text-8xl mb-5">
          Journey with Jesus
        </h1>
        <h2 className="text-lg mb-10">
          A place for a saint in sanctification to post about life with Jesus.
        </h2>
        <form className="flex mb-5 text-sm">
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            className="min-w-60 focus:outline-none border focus:border-sky-300 focus:shadow-sm focus:shadow-sky-200 rounded-r-none rounded-sm leading-8 px-2.5 pt-1"
          />
          <ToolTip tooltip="Get Weekly Updates">
            <button type="submit" className="btn-primary rounded-l-none">
              Subscribe
            </button>
          </ToolTip>
        </form>
      </Header>
      <div className="flex justify-center mx-auto">
        <PostLinkGrid posts={sortedPosts} />
      </div>
    </main>
  );
}
