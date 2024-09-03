'use client';

import Form from '@/components/form/Form';
import { useParams } from 'next/navigation';
import React from 'react';

const UpdatePostPage = () => {
  const { id } = useParams();

  const idToNumber = Number(id);

  return (
    <div>
      <Form params={{ id: idToNumber }} />
    </div>
  );
};

export default UpdatePostPage;
