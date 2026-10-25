'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { revalidatePath } from 'next/cache'
import connectDB from '@/lib/mongodb'
import Post from '@/models/Post'

export async function createPost(formData) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  const title = formData.get('title')
  const content = formData.get('content')
  const slug = formData.get('slug')

  if (!title || !content || !slug) {
    throw new Error('Please provide all fields')
  }

  await connectDB()

  // Check if slug exists
  const existingPost = await Post.findOne({ slug })
  if (existingPost) {
    throw new Error('Slug already exists')
  }

  await Post.create({
    title,
    content,
    slug,
    author: session.user.id,
  })

  revalidatePath('/blog')
  revalidatePath('/dashboard')
}

export async function updatePost(id, formData) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  await connectDB()

  const post = await Post.findById(id)

  if (!post) {
    throw new Error('Post not found')
  }

  if (post.author.toString() !== session.user.id) {
    throw new Error('Forbidden')
  }

  const title = formData.get('title')
  const content = formData.get('content')
  const published = formData.get('published') === 'true'

  post.title = title
  post.content = content
  post.published = published
  post.updatedAt = Date.now()

  await post.save()

  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  revalidatePath('/dashboard')
}

export async function deletePost(id) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Unauthorized')
  }

  await connectDB()

  const post = await Post.findById(id)

  if (!post) {
    throw new Error('Post not found')
  }

  if (post.author.toString() !== session.user.id) {
    throw new Error('Forbidden')
  }

  await Post.findByIdAndDelete(id)

  revalidatePath('/blog')
  revalidatePath('/dashboard')
}
