import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import styles from './notfound.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <FileQuestion className={styles.icon} />
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>This post doesn't exist</p>
      <Link href="/blog" className={styles.link}>
        Back to Blog
      </Link>
    </div>
  )
}
