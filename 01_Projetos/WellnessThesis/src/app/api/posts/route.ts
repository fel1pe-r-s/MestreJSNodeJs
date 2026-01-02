import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { verifyJwt } from '@/lib/jwt';

export async function GET() {
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
  if (!token || !verifyJwt(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const body = await request.json();
  
  try {
    const post = await Post.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
