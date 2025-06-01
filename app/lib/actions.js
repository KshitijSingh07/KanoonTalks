import { connectToDatabase } from "./mongodb";
import Post from "../model/post";

export async function getAllPosts() {
  // Sirf approved posts fetch karo
  return await Post.find({ status: 'approved' }).lean();
}

// Ab slug se post fetch karne ke liye function
export const getPostBySlug = async (slug) => {
  await connectToDatabase();
  const post = await Post.findOne({ slug, status: 'approved' }).lean();
  return post;
};

// Sabhi approved posts ke slug return karne ke liye function
export const getAllPostSlugs = async () => {
  await connectToDatabase();
  const posts = await Post.find({ status: 'approved' }, { slug: 1, _id: 0 }).lean();
  return posts.map(post => ({
    params: { slug: post.slug }
  }));
};
