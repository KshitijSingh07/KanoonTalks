import BlogCard from "../componets/BlogCard";
import { getAllPosts } from "../lib/actions";

export default async function BlogsPage({ searchParams }) {
  const params = await searchParams; // Await searchParams

  const searchTerm = params?.search || "";

  const posts = await getAllPosts();

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-h-screen pt-24 px-6 mx-auto transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-section-bg)',
        color: 'var(--color-primary-text)',
      }}
    >
      <main>
        <section className="text-center">
          <div className="flex justify-end items-center mb-8 max-w-6xl mx-auto px-4">
            <form method="GET" className="flex flex-wrap gap-2">
              <input
                type="text"
                name="search"
                defaultValue={searchTerm}
                placeholder="Search posts by title..."
                className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-64"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Search
              </button>
            </form>
          </div>
        </section>


        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard
                key={post._id}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                image={post.image}
              />
            ))
          ) : (
            <p
              className="col-span-full text-center"
              style={{ color: 'var(--color-paragraph-text)' }}
            >
              No blogs found matching your search.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
