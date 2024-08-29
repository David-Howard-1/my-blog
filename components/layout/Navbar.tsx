import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <div className='flex space-x-6 text-sm p-2 pl-4 font-bold bg-amber-100'>
        <Link href='/' className='hover:text-amber-600 transition-colors'>
          Home
        </Link>
        <Link href='/posts' className='hover:text-amber-600 transition-colors'>
          Posts
        </Link>
        <Link
          href='/posts/create'
          className='hover:text-amber-600 transition-colors'
        >
          New Post
        </Link>
        <Link
          href='/posts/create-zod'
          className='hover:text-amber-600 transition-colors'
        >
          New Post (Zod)
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
