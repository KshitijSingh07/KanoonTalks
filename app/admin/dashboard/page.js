'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingPostSlug, setUpdatingPostSlug] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    if (user?.publicMetadata?.role !== 'admin') {
      router.push('/');
      return;
    }

    fetchPosts();
  }, [isLoaded, isSignedIn, user, router]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch('/api/posts?status=pending');
      if (!res.ok) throw new Error('Failed to fetch posts');

      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
      setPosts([]);
    }
    setLoading(false);
  }

  async function updatePostStatus(slug, status) {
    setUpdatingPostSlug(slug);
    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(`Failed to update post status: ${errData.error || res.statusText}`);
        setUpdatingPostSlug(null);
        return;
      }

      alert(`Post ${status}`);
      fetchPosts();
    } catch (error) {
      alert('Failed to update post status');
      console.error(error);
    }
    setUpdatingPostSlug(null);
  }

  if (!isLoaded || !isSignedIn) return <p>Loading...</p>;
  if (user?.publicMetadata?.role !== 'admin') return <p>Access Denied</p>;

  return (
    <div
      className="p-10 min-h-screen"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)",
      }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/admin/create-post')}
            style={{
              backgroundColor: "var(--color-blue-primary)",
              color: "var(--color-cta-text)"
            }}
            className="px-4 py-2 rounded hover:brightness-110 transition"
          >
            Create Post
          </button>
          <button
            onClick={() => router.push('/admin/blogs')}
            style={{
              backgroundColor: "var(--color-blue-primary)",
              color: "var(--color-cta-text)"
            }}
            className="px-4 py-2 rounded hover:brightness-110 transition"
          >
            All Blogs
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No pending posts</p>
      ) : (
        posts.map(post => (
          <div
            key={post._id}
            className="border p-6 mb-6 rounded shadow hover:shadow-lg transition cursor-pointer"
            style={{
              backgroundColor: "var(--color-card-bg)",
              color: "var(--color-card-text)",
              borderColor: "var(--color-card-text)",
            }}
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p><b>Author:</b> {post.author}</p>
            <p className="mb-4">{post.excerpt}</p>

            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                post.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                post.status === 'approved' ? 'bg-green-200 text-green-800' :
                'bg-red-200 text-red-800'
              }`}
            >
              {post.status.toUpperCase()}
            </span>

            <div className="mt-4 space-x-3">
              <button
                style={{ backgroundColor: 'var(--color-blue-primary)', color: 'var(--color-cta-text)' }}
                className="px-4 py-2 rounded hover:brightness-110 transition disabled:opacity-50"
                onClick={() => updatePostStatus(post.slug, 'approved')}
                disabled={updatingPostSlug === post.slug}
              >
                Approve
              </button>

              <button
                style={{ backgroundColor: 'var(--color-cta-button-bg)', color: 'var(--color-blue-primary)' }}
                className="px-4 py-2 rounded hover:brightness-90 transition disabled:opacity-50"
                onClick={() => updatePostStatus(post.slug, 'rejected')}
                disabled={updatingPostSlug === post.slug}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
