'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts'); // GET all posts
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      alert('Failed to fetch posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const updateStatus = async (slug, status) => {
    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      fetchPosts();
    } else {
      alert(data.error || 'Failed to update status');
    }
  };

  const deletePost = async (slug) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const res = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        alert('Deleted successfully');
        fetchPosts();
      } else {
        alert(data.error || 'Failed to delete');
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
      <button
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => router.push('/admin/create-post')}
      >
        Create New Blog
      </button>

      {posts.map((post) => (
        <div key={post._id} className="mb-4 p-4 border rounded shadow">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-600">{post.excerpt}</p>
          <p className="text-xs text-gray-500">Status: {post.status}</p>

          <div className="mt-2 space-x-2">
           
            <button
              className="px-3 py-1 bg-yellow-500 text-white rounded"
              onClick={() => router.push(`/admin/blogs/edit-post/${post.slug}`)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => deletePost(post.slug)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
