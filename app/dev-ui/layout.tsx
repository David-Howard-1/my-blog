import React from 'react';

const DevUILayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full min-h-screen p-4 sm:p-10">
      {children}
    </main>
  );
};

export default DevUILayout;
