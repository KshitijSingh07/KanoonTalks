'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', author: '', image: '' });

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setForm({
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          author: data.author,
          image: data.image || '',
        });
      });
  }, [slug]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, status: post.status }),
    });

    if (res.ok) {
      alert('Updated!');
      router.push('/admin/blogs');
    } else {
      const data = await res.json();
      alert(data.error || 'Failed to update');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleUpdate} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
        />
        <input
          className="w-full p-2 border rounded"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          placeholder="Excerpt"
        />
        <textarea
          className="w-full p-2 border rounded"
          rows={6}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Content"
        />
        <input
          className="w-full p-2 border rounded"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder="Author"
        />
        <input
          className="w-full p-2 border rounded"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="Image URL (optional)"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
      </form>
    </div>
  );
}
