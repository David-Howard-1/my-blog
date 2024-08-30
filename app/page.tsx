import PostLinkGrid from '@/components/ui/PostLinkGrid';
import PostLinkGridStatic from '@/components/ui/PostLinkGridStatic';
import { db } from '@/db';

export default async function Home() {
  const posts = await db.query.postsTable.findMany();

  return (
    <main className="min-h-screen">
      <div className="flex flex-col justify-center items-center p-32 pb-20 bg-amber-100">
        <h1 className="font-bold tracking-tight text-7xl mb-2 ">
          Journey with Jesus
        </h1>
        <h2 className="text-lg mb-10">
          A place for a saint in sanctification to post about life with Jesus.
        </h2>
        <div className="flex group mb-5 text-sm">
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            className="min-w-60 focus:outline-none border focus:border-sky-300 focus:shadow-sm focus:shadow-sky-200 rounded-r-none rounded-sm leading-8 px-2.5 pt-1"
          />
          <button className="btn-primary rounded-l-none">Subscribe</button>
        </div>
      </div>
      <hr className="w-full mb-12" />
      <div className="flex justify-center mx-auto">
        <PostLinkGrid posts={posts} />
        {/* <PostLinkGridStatic /> */}
      </div>
    </main>
  );
}
