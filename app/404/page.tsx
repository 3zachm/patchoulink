import Link from "next/link";

export default function error404() {
    return (
        <main>
        <h1>404</h1>
        <Link href="/">
            <p>Home</p>
        </Link>
        </main>
    )
}