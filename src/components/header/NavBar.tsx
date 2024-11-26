"use client";
import Link from "next/link";
import { GrTechnology } from "react-icons/gr";
import styles from "./header.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
interface NavBarProps {
  isAdmin: boolean;
}
const NavBar = ({ isAdmin }: NavBarProps) => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/" className={styles.logo}>
          Cloude
          <GrTechnology />
          Hosting
        </Link>
        <div className={styles.menu} onClick={() => setToggle((prev) => !prev)}>
          {!toggle ? <AiOutlineMenu /> : <IoMdClose />}
        </div>
      </div>
      <div
        className={styles.navLinkWrapper}
        style={{
          clipPath:
            (toggle && "polygon(0 0, 100% 0%, 100% 100%, 0 100%)") || " ",
        }}
      >
        <ul className={styles.navLinks}>
          <Link
            className={styles.navLink}
            href={"/"}
            onClick={() => setToggle(false)}
          >
            Home
          </Link>
          <Link
            className={styles.navLink}
            href={"/article?pageNumber=1"}
            onClick={() => setToggle(false)}
          >
            Article
          </Link>
          <Link
            className={styles.navLink}
            href={"/about"}
            onClick={() => setToggle(false)}
          >
            About
          </Link>

          {isAdmin && (
            <Link
              className={styles.navLink}
              href={"/admin"}
              onClick={() => setToggle(false)}
            >
              Admin Dashboard
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
