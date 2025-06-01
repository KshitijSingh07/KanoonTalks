// app/api/posts/search/route.js
import { NextResponse } from 'next/server';
import {connectToDatabase} from '../../../lib/mongodb';
import Post from '../../../model/post';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  await connectToDatabase();

  try {
    const regex = new RegExp(query, 'i'); // case-insensitive search
    const posts = await Post.find({
      $or: [
        { title: regex },
        { excerpt: regex },
        { content: regex },
      ],
      status: 'approved', // optional: show only approved posts
    }).select('title slug excerpt image createdAt');

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
