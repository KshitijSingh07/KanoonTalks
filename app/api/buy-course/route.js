// app/api/buy-course/route.js
import connectToDatabase from '../../lib/mongodb';
import UserCourse from '../../model/UserCourse';
import { auth } from '@clerk/nextjs/server';

export async function POST(request) {
  const { userId } = auth();
  if (!userId) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

  const { courseId } = await request.json();
  if (!courseId) return new Response(JSON.stringify({ error: 'Course ID required' }), { status: 400 });

  await connectToDatabase();

  const existing = await UserCourse.findOne({ userId, courseId });
  if (existing) {
    return new Response(JSON.stringify({ message: 'Already purchased' }), { status: 200 });
  }

  await UserCourse.create({ userId, courseId });
  return new Response(JSON.stringify({ message: 'Course purchased' }), { status: 201 });
}
