import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';

const playfair_dp = Playfair_Display({ subsets: ['latin'] });
//${playfair_dp.className}
const Footer = () => {
  return (
    <footer className="h-64 bg-stone-700 text-white mt-20 shadow">
      <div className="px-64 py-10 grid grid-cols-2 font-light">
        <div>
          <h5
            className={`uppercase tracking-wider text-lg text-stone-200 mb-1`}
          >
            Contact
          </h5>
          <ul className="space-y-1">
            <li>
              <Link href="mailto:davidweh7878@hotmail.com">
                davidweh7878@hotmail.com
              </Link>
            </li>
            <li>
              <Link href="tel:2052535616">205-253-5616</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
