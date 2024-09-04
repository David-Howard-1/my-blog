'use client';

import { postsTable } from '@/db/schema';
import { db } from '@/db';
import { playfair_dp } from '@/lib/playfairDisplay';
import { ChangeEvent, useState } from 'react';
import FormField from './FormField';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type FormDataTypes = {
  title: string;
  subtitle: string;
  category: string;
  content: string;
};

const ClientSideForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataTypes>({
    title: '',
    subtitle: '',
    category: '',
    content: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(name, ': ', value);
  };

  const onSubmit = async () => {
    /*** API POST call goes here ***/

    const res = await toast.promise(
      fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }),
      {
        loading: 'Submitting Post...',
        success: 'Post submitted successfully!',
        error: 'Unable to submit Post',
      }
    );

    if (res?.status === 200) {
      router.replace(`/posts/${res.json()}`)
    }

    // await db.insert(postsTable).values({
    //   title: 'The Bible is Not a Behavior Manual',
    //   subtitle:
    //     'The Bible is the unified story of God, culminated in Jesus of Nazareth',
    //   category: 'Biblical Literacy',
    //   content:
    //     "The Bible is far more than a manual for behavior; it is a unified story that reveals God's relationship with His people, culminating in the life, death, and resurrection of Jesus. This narrative weaves together the history of God's creation, His covenant with humanity, and His ultimate plan for redemption through Christ. As we engage with the Scriptures, we discover not just rules to live by, but wisdom that shapes our understanding of the world and our place in it. This grand story gives us purpose and direction, grounding our lives in the truth of God's love and grace.",
    //   userId: 1,
    // });
  };

  return (
    <form action={onSubmit} className="flex flex-col">
      <FormField
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className={`${playfair_dp.className} border-b hover:border-sky-300 focus:border-sky-400 focus:border-b-[1.5px] max-w-2xl placeholder:text-3xl text-3xl mb-4 p-2`}
      />
      <FormField
        type="text"
        name="subtitle"
        placeholder="Subtitle"
        value={formData.subtitle}
        onChange={handleChange}
        className="border-b hover:border-sky-300 focus:border-sky-400 focus:border-b-[1.5px] max-w-xl mb-10 p-2 pl-4"
      />
      <FormField
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="border-b hover:border-sky-300 focus:border-sky-400 focus:border-b-[1.5px] max-w-xl mb-10 p-2 pl-4"
      />
      <FormField
        textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Write your post here"
        className="text-input max-w-6xl min-h-64 resize-none rounded-md px-4 p-2"
      />
      <button type="submit" className="btn-primary max-w-16 mt-10">
        Post
      </button>
    </form>
  );
};

export default ClientSideForm;
