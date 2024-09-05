'use client';

import { useEffect } from 'react';

const RefreshCache = ({ check }: { check: () => Promise<void> }) => {
  useEffect(() => {
    const onFocus = () => check();

    window.addEventListener('focus', onFocus);

    return () => window.removeEventListener('focus', onFocus);
  });

  return null;
};

export default RefreshCache;
