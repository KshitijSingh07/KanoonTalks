import { getPostBySlug } from "../../lib/actions";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({ params }) {
  console.log("params", params)
  const { slug } = params; 
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  return (
    <main className="min-h-screen dark:bg-gray-900 bg-white bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <article className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {post.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center mb-6 space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold uppercase select-none">
            {post.author ? post.author.charAt(0) : "A"}
          </div>
          <div>
            <p className="text-gray-700 font-medium">{post.author || "Anonymous"}</p>
            <p className="message-time text-sm text-gray-500">
              {post.createdAt ? new Date(post.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              }) : 'Unknown time'}
            </p>
          </div>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="italic text-gray-600 mb-8 border-l-4 border-blue-400 pl-4">
            {post.excerpt}
          </p>
        )}

        {/* Image */}
        {post.image && (
          <div className="mb-8 overflow-hidden rounded-lg shadow-md">
            <img
              src={post.image}
              alt={post.title}
              className="w-full object-cover max-h-96 transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </article>
    </main>
  );
}
