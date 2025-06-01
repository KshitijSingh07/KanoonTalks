// app/page.jsx
import Link from "next/link";
import BlogCard from "./componets/BlogCard"; // adjust path as needed
import TypingEffect from "./componets/TypingEffect";
import { connectToDatabase } from "./lib/mongodb";
import Post from "./model/post";
// Removed: import ThemeToggle from "./lib/ThemeToggle"; // ThemeToggle is now handled by Navbar or global layout

export default async function Home() {
  // Connect to DB and fetch posts inside the async server component
  await connectToDatabase();
  const posts = await Post.find().sort({ createdAt: -1 }).limit(5).lean();
  console.log(posts)
  // Map posts for serialization (convert _id to string)
  const serializedPosts = posts.map(post => ({
    _id: post._id.toString(),
    title: post.title,
    excerpt: post.excerpt || "",
    content: post.content || "",
    author: post.author,
    image: post.image,
    slug: post.slug
  }));

  return (
    // Make the outer div a flex column to manage vertical space and push content down
    <div className="min-h-screen flex flex-col transition-colors duration-300">

      {/* Removed: Theme Toggle Button from here as it's in Navbar */}
      {/* <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div> */}

      {/* Hero section full width */}
      <section
        className="relative bg-cover mb-10 bg-centery min-h-[90vh] w-full"
        style={{
          backgroundImage: "url('/bg.jpg')", // Ensure this path is correct for your image
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content container constrained - Changed justify-center to justify-center md:justify-between */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center md:justify-between min-h-[90vh]">
          {/* Left text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-5xl font-bold mb-4 text-white">
              <TypingEffect />
            </h1>
            <p className="text-left text-lg  text-gray-200 mb-6">
            From Law Students to Lawyers — Stay Informed, Stay Empowered.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:gap-4">
              <Link href="/create" passHref>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition shadow-md">
                  Create Your Own Blog &rarr;
                </button>
              </Link>
              <Link href="/blogs" className="px-6 py-3 mt-4 sm:mt-0 text-blue-300 underline hover:text-blue-200">
                View All Blogs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main content area constrained - now flex-grow to take available space */}
      <main className="flex-grow pt-[var(--main-content-padding-top)] px-6 max-w-6xl mx-auto">

        {/* Blog Preview */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary-text transition-colors duration-300">Latest Articles</h2>
          {serializedPosts.length === 0 ? (
            <p className="text-paragraph-text text-lg transition-colors duration-300">No articles found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serializedPosts.map((post) => (
                <BlogCard
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  slug={post.slug} 
                  excerpt={post.excerpt || post.content.slice(0, 100) + "..."}
                  author={post.author}
                  image={post.image}
                />
              ))}
            </div>
          )}
        </section>

        {/* Why Write With Us */}
        <section className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary-text transition-colors duration-300">Why Write With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 shadow rounded-lg bg-card-bg border border-b-gray-500 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-2 text-primary-text">✨ Build Your Legal Portfolio</h3>
              <p className="text-card-text">Showcase your expertise and opinions on legal matters. Great for your resume or LinkedIn!</p>
            </div>
            <div className="p-6 shadow rounded-lg bg-card-bg border border-b-gray-500 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-2 text-primary-text">🌍 Reach a Wider Audience</h3>
              <p className="text-card-text">Our platform is viewed by students, professionals, and legal experts across India.</p>
            </div>
            <div className="p-6 shadow rounded-lg bg-card-bg border border-b-gray-500 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-2 text-primary-text">💸 Get Recognized</h3>
              <p className="text-card-text">Stand out! Top blogs might get featured, promoted, and even rewarded.</p>
            </div>
          </div>
        </section>

        

        {/* Final CTA */}
        <section className="my-24 text-center py-10 rounded-xl shadow-lg border border-b-gray-500 transition-colors duration-300
                            bg-cta-bg text-cta-text">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Legal Voice?</h2>
          <p className="mb-6 text-lg">Get started by creating your first blog. Our team will help you refine it and get it published.</p>
          <Link href="/create">
            <button className="font-semibold px-6 py-3 bg-emerald-400 rounded shadow transition
                               bg-cta-button-bg text-cta-button-text hover:bg-cta-button-hover-bg">
              Start Writing Now →
            </button>
          </Link>
        </section>

      </main>
    </div>
  );
}
