'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { supabase } from '../../lib/supabaseClient';
import Image from 'next/image';

export default function AdminCreatePage() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { user, isLoaded } = useUser();

  const isAdmin = () => {
    if (!user) return false;
    return user.publicMetadata?.role === 'admin';
  };

 useEffect(() => {
  if (isLoaded) {
    if (!user || !isAdmin()) {
      alert('Access denied. Admins only.');
      router.push('/admin/dashboard');
    } else {
      setLoading(false);
    }
  }
}, [user, isLoaded, router, isAdmin]);


  const uploadImage = async (file) => {
    if (!file) return null;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage.from('images').upload(fileName, file);
    setUploading(false);

    if (error) {
      alert('Image upload failed: ' + error.message);
      return null;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !isAdmin()) {
      alert("You don't have permission to create a blog.");
      return;
    }

    let publicImageUrl = '';
    if (file) {
      publicImageUrl = await uploadImage(file);
      if (!publicImageUrl) return;
      setImageUrl(publicImageUrl);
    }

    const blogData = {
      title,
      excerpt,
      content,
      author: user.fullName || user.email,
      image: publicImageUrl || '',
      status: 'approved',
    };

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData),
    });

    if (res.ok) {
      alert('✅ Blog Created and Approved!');
      router.push('/admin/dashboard');
    } else {
      alert('❌ Failed to create blog');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <p>Checking permissions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex items-center justify-center p-10">
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full md:w-1/2"
        >
          <h1 className="text-3xl font-bold mb-4">Create a New Blog (Admin)</h1>

          <input
            type="text"
            placeholder="Title"
            className="p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white outline-none border border-gray-400 focus:border-black dark:focus:border-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Excerpt (Short description)"
            className="p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white outline-none border border-gray-400 focus:border-black dark:focus:border-white"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />

          <textarea
            placeholder="Content"
            rows="10"
            className="p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white outline-none border border-gray-400 focus:border-black dark:focus:border-white resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-black dark:text-white"
          />
          {uploading && <p className="text-yellow-600 dark:text-yellow-400">Uploading image...</p>}
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" className="w-48 mt-2 rounded" />
          )}

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded mt-4"
            disabled={uploading}
          >
            Publish Blog
          </button>
        </form>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center w-full">
          <Image
            src="/admin.svg"
            alt="Admin Illustration"
            className="w-full max-w-none drop-shadow-xl"
            style={{ maxWidth: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
