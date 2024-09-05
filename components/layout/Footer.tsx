import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { instagram, threads } from '@/lib/socialLinks';
import { InstagramIcon, ThreadsIcon } from 'hugeicons-react';
import ToolTip from '../ui/ToolTip';

const playfair_dp = Playfair_Display({ subsets: ['latin'] });
//${playfair_dp.className}
const Footer = () => {
  return (
    <footer className="h-64 bg-stone-700 text-white sm:mt-20 shadow">
      <div className="px-3 md:px-64 py-4 md:py-10 grid grid-cols-1 sm:grid-cols-2 font-light">
        <div>
          {/* contact information */}
          <h5
            className={`uppercase tracking-tight text-sm font-bold text-stone-400 mb-1`}
          >
            Contact
          </h5>
          <ul className="space-y-1">
            <li>
              <ToolTip tooltip="Email Now">
                <button>
                  <Link href="mailto:davidweh7878@hotmail.com">
                    davidweh7878@hotmail.com
                  </Link>
                </button>
              </ToolTip>
            </li>
            <li>
              <Link href="tel:2052535616">205-253-5616</Link>
            </li>
            <div
              id="phone"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Call today
            </div>
          </ul>
          {/* Social */}
          <ul className="space-x-1 flex items-center mt-1">
            <li>
              <Link href={threads} target="_blank">
                {/* Threads */}
                <ThreadsIcon />
              </Link>
            </li>
            <li>
              <Link href={instagram} target="_blank">
                {/* Instagram */}
                <InstagramIcon />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
