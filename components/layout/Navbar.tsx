import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className="flex space-x-4">
        <Link href="/">Home</Link>
        <Link href="/">Posts</Link>
      </div>
    </nav>
  );
};

export default Navbar;
