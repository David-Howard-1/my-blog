'use client';

import React, { useEffect, useState } from 'react';
import JSONPretty from 'react-json-pretty';

const DevPage = () => {
  const [posts, setPosts] = useState(null);
  const [singlePost, setSinglePost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      let res = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let data = await res.json();
      setPosts(data);
    };

    const fetchSinglePost = async () => {
      let res = await fetch('/api/posts?id=3', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let data = await res.json();
      setSinglePost(data);
    };

    fetchSinglePost();
    fetchPosts();
  }, []);

  return (
    <div className="p-2 space-y-5">
      <div>
        <h1 className="font-black text-xl">SINGLE POST</h1>
        <JSONPretty json={singlePost} className="ml-3" />
      </div>
      <div>
        <h1 className="font-black text-xl">ALL POSTS</h1>
        <JSONPretty json={posts} className="ml-3" />
      </div>
    </div>
  );
};

export default DevPage;
