"use client";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <h1>patchoulink</h1>
      <div className={styles.account}>
        <p>Login</p>
      </div>
    </nav>
  )
}
