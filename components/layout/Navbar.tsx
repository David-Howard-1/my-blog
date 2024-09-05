import Link from 'next/link';
import { ArrowDown01Icon } from 'hugeicons-react';

const Navbar = () => {
  return (
    <nav className="p-3 pl-5 bg-amber-100 top-0 sticky">
      <div className="flex space-x-6 text font-bold">
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Home
        </Link>
        <Link href="/posts" className="hover:text-amber-600 transition-colors">
          Posts
        </Link>
        <Link
          href="/about"
          className="hover:text-amber-600 transition-colors flex items-center"
        >
          About <ArrowDown01Icon size={20} type={'standard'} className="ml-2" />
        </Link>
        <Link
          href="/posts/create"
          className="hover:text-amber-600 transition-colors"
        >
          New Post
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
