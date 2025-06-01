// app/api/check-access/route.js
import {connectToDatabase} from '../../lib/mongodb';
import UserCourse from '../../model/UserCourse';
import { auth } from '@clerk/nextjs/server';

export async function POST(request) {
  const { userId } = auth();
  if (!userId) return new Response(JSON.stringify({ allowed: false }), { status: 401 });

  const { courseId } = await request.json();
  if (!courseId) return new Response(JSON.stringify({ allowed: false }), { status: 400 });

  await connectToDatabase();

  const hasAccess = await UserCourse.findOne({ userId, courseId });
  return new Response(JSON.stringify({ allowed: !!hasAccess }), { status: 200 });
}
