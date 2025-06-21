import { getPostBySlug, getAllPostSlugs } from "../lib/actions";
import Head from "next/head";

export async function getStaticPaths() {
  const slugs = await getAllPostSlugs();  // Slugs ki list laao
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);  // Slug ke basis pe post laao
  return { props: { post } };
}

import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ slug, title, excerpt, author, authorImage, image }) {
  return (
    <Link href={`/blogs/${slug}`}>   {/* id ki jagah slug use karo */}
      <div
        className="
          p-6 my-10 border border-gray-200 rounded-lg shadow-md 
          hover:shadow-xl transition-shadow duration-300 cursor-pointer 
          flex flex-col justify-between h-[550px]"
      >
        {/* Blog Featured Image */}
        {image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={800}
              height={300}
              className="w-full object-cover rounded-lg"
              priority
            />
          </div>
        )}

        {/* Title and Excerpt */}
        <div className="flex-grow">
          <h2 className="text-xl font-semibold  mb-2">{title}</h2>
          <p className="text-gray-700 dark:text-gray-600 mb-4 line-clamp-4">{excerpt}</p>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-3 mt-auto">
          {authorImage && (
            <Image
              src={authorImage}
              alt={author}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            By {author || "Anonymous"}
          </span>
        </div>
      </div>
    </Link>
  );
}
