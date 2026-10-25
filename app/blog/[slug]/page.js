import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import styles from './post.module.css'
import connectDB from '@/lib/mongodb'
import Post from '@/models/Post'

async function getPost(slug) {
  try {
    await connectDB()
    const post = await Post.findOne({ slug, published: true }).populate('author', 'name email')
    return post
  } catch (error) {
    return null
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160),
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <Link href="/blog" className={styles.back}>
        <ArrowLeft className={styles.backIcon} />
        Back to Posts
      </Link>

      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <User className={styles.icon} />
              {post.author?.name || 'Anonymous'}
            </span>
            <span className={styles.metaItem}>
              <Calendar className={styles.icon} />
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </header>

        <div className={styles.content}>
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  )
}
