import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import shouldImg from '@/public/shame-and-sadness.jpg';
import prayerImg from '@/public/prayer.jpg';
import scriptureImg from '@/public/scripture.jpg';
import gal220Img from '@/public/gal220.jpg';

export interface IPost {
  id: number;
  title: string;
  img: string | StaticImport;
  subtitle: string;
  creationDate: string;
  creationTime: string;
  tag: string;
}

export const Posts: IPost[] = [
  {
    id: 1,
    title: 'Should and Should Not',
    subtitle:
      'How unrealistic expectations inhibit our God-given individuality',
    img: shouldImg,
    creationDate: 'November 20, 2024',
    creationTime: '10:22 am',
    tag: 'emotional health',
  },
  {
    id: 2,
    title: 'Prayer as Intimacy',
    subtitle: 'Jesus opens the Lord\'s prayer with "Our Father"',
    img: prayerImg,
    creationDate: 'November 13, 2024',
    creationTime: '10:47 am',
    tag: 'Spiritual Formation',
  },
  {
    id: 3,
    title: 'The Bible is Not a Behavior Manual',
    subtitle:
      'The Bible is the unified story of God, culminated in Jesus of Nazareth',
    img: scriptureImg,
    creationDate: 'November 6, 2024',
    creationTime: '9:56 am',
    tag: 'Biblical Literacy',
  },
  {
    id: 4,
    title: 'Grace Alone',
    subtitle: 'We live by grace and grace alone',
    img: gal220Img,
    creationDate: 'Oct 31, 2024',
    creationTime: '10:13 am',
    tag: 'Biblical Literacy',
  },
];
