// app/search/SearchResults.jsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/posts/search?q=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && <p>No results found.</p>}

      <ul className="space-y-4">
        {results.map((post) => (
          <li key={post._id} className="border p-4 rounded hover:bg-cyan-600">
            <Link href={`/blogs/${post.slug}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm ">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
