'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { supabase } from '../lib/supabaseClient';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();
  const { user } = useUser();

  const uploadImage = async (file) => {
    if (!file) return null;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from('images')
      .upload(fileName, file);

    setUploading(false);

    if (error) {
      alert('Image upload failed: ' + error.message);
      return null;
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to create a blog.");
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
      author: user.fullName,
      image: publicImageUrl || '',
    };

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData),
    });

    if (res.ok) {
      alert('✅ Blog Created! Waiting for admin approval.');
      router.push('/');
    } else {
      alert('❌ Failed to create blog');
    }
  };

  const payAndSubmit = async () => {
    const res = await fetch('/api/razorpay/create-order', {
      method: 'POST',
    });

    const data = await res.json();
    const order = data.order;

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Failed to load Razorpay SDK.');
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Blog Platform',
      description: '₹50 Upload Fee',
      order_id: order.id,
      handler: async function (response) {
        // Payment was successful
        await handleSubmit();
      },
      prefill: {
        name: user?.fullName || '',
        email: user?.primaryEmailAddress?.emailAddress || '',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-10">
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-10">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">Create Your Blog</h1>

          <input
            type="text"
            placeholder="Title"
            className="p-2 rounded text-black outline-none border border-gray-400 focus:border-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Excerpt (Short description)"
            className="p-2 rounded text-black outline-none border border-gray-400 focus:border-black"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />

          <textarea
            placeholder="Content"
            rows="10"
            className="p-2 rounded text-black outline-none border border-gray-400 focus:border-black resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-black"
          />
          {uploading && <p className="text-yellow-600">Uploading image...</p>}
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" className="w-48 mt-2 rounded" />
          )}

          <button
            type="button"
            onClick={payAndSubmit}
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-4"
            disabled={uploading}
          >
            Pay ₹50 & Publish Blog
          </button>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center w-full">
          <img
            src="/lawyer-animate.svg"
            alt="Law Illustration"
            className="w-full max-w-none drop-shadow-xl"
            style={{ maxWidth: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
