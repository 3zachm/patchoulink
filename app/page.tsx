import Image from 'next/image'
import styles from './page.module.scss'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Placeholder</h1>
      <Link href='http://localhost:3000/google'>Google</Link>
    </main>
  )
}
