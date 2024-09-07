"use client";
import Link from "next/link";
import styles from "./SideBar.module.scss";
import { usePathname } from "next/navigation";
import { IoHome, IoLinkSharp, IoAddCircle } from "react-icons/io5";

export default function SideBar() {
  const pathname = usePathname();
  const LinkEntry = ({
    href,
    children
  }: {
    href: string,
    children: React.ReactNode
  }) => {
    return (
      <li className={pathname == href ? styles.selected : ""}>
        <Link href={href}>{ children }</Link>
      </li>
    );
  }
  return (
    <div className={styles.sidebar}>
      <ul>
        <LinkEntry href={"/dashboard"}>
          <IoHome />Home
        </LinkEntry>
        <LinkEntry href={"/dashboard/links"}>
          <IoLinkSharp />Links
        </LinkEntry>
        <LinkEntry href={"/dashboard/create"}>
          <IoAddCircle />Create
        </LinkEntry>
      </ul>
    </div>
  );
}
