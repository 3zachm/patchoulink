import Link from "next/link";
import styles from "./layout.module.scss";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavBar />
      <section className={styles.pageContainer}>
        <SideBar />
        <main className={styles.pageContent}>
          {children}
        </main>
      </section>
    </>
  )
}
