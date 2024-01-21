import '@/app/globals.scss'
import styles from './layout.module.scss'

export default function StatsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }