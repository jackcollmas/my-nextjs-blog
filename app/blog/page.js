import Link from 'next/link'
import { Calendar, User } from 'lucide-react'
import styles from './blog.module.css'

async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/posts`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.posts || []
  } catch (error) {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Posts</h1>
        <p className={styles.subtitle}>Read our latest articles</p>
      </div>

      {posts.length === 0 ? (
        <div className={styles.empty}>
          <p>No posts yet. Be the first to write one!</p>
          <Link href="/register" className={styles.emptyLink}>
            Get Started
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
              </div>

              <p className={styles.excerpt}>
                {post.content.substring(0, 150)}...
              </p>

              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <User className={styles.icon} />
                  {post.author?.name || 'Anonymous'}
                </span>
                <span className={styles.metaItem}>
                  <Calendar className={styles.icon} />
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                Read More
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
