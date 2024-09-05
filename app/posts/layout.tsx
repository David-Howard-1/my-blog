import React, { PropsWithChildren, ReactNode } from 'react';

const PostsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex flex-col w-full min-h-screen p-4 sm:p-10">
      {children}
    </main>
  );
};

export default PostsLayout;
