import { connectToDatabase } from "../../lib/mongodb";
import Post from "../../model/post";
import slugify from "slugify"; // install if not already: npm i slugify

export async function GET(req) {
  await connectToDatabase();

  const url = new URL(req.url);
  const status = url.searchParams.get('status');

  const filter = status ? { status } : { status: 'approved' };
  const posts = await Post.find(filter);

  return new Response(JSON.stringify(posts), { status: 200 });
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { title, excerpt, content, author, image } = body;

    if (!title || !excerpt || !content || !author) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existing = await Post.findOne({ slug });
    if (existing) {
      return new Response(JSON.stringify({ error: 'Slug already exists. Use a different title.' }), { status: 409 });
    }

    const newPost = await Post.create({
      title,
      excerpt,
      content,
      author,
      image,
      slug,
      status: 'pending', // default
    });

    return new Response(JSON.stringify({ message: 'Blog created successfully!', data: newPost }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
