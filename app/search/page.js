// app/search/page.jsx
import { Suspense } from 'react';
import SearchResults from './SearchResults';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
