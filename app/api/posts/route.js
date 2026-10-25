import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import connectDB from '@/lib/mongodb'
import Post from '@/models/Post'

// GET - Get all published posts (public)
export async function GET() {
  try {
    await connectDB()
    
    const posts = await Post.find({ published: true })
      .populate('author', 'name email')
      .sort({ createdAt: -1 })

    return NextResponse.json({ posts }, { status: 200 })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST - Create new post (protected)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { title, content, slug } = await request.json()

    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Please provide title, content, and slug' },
        { status: 400 }
      )
    }

    await connectDB()

    // Check if slug already exists
    const existingPost = await Post.findOne({ slug })
    if (existingPost) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      )
    }

    const post = await Post.create({
      title,
      content,
      slug,
      author: session.user.id,
    })

    return NextResponse.json(
      { message: 'Post created', post },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
