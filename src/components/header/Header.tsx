import Link from "next/link";

import styles from "./header.module.css";
import NavBar from "./NavBar";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import LogoutButton from "./LogoutButton";
const Header = () => {
  const token = cookies().get("token")?.value || "";
  const userData = verifyTokenForPage(token);

  return (
    <header className={styles.header + " shadow-md"}>
      <NavBar isAdmin={userData?.isAdmin || false} />
      <div className={styles.right}>
        {userData ? (
          <>
            <strong className="text-blue-800 md:text-xl capitalize">
              {userData?.userName}
            </strong>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link
              className={styles.btn + " bg-blue-600  hover:bg-blue-700"}
              href={"/login"}
            >
              Login
            </Link>
            <Link
              className={styles.btn + " bg-blue-600 hover:bg-blue-700"}
              href={"/register"}
            >
              Resister
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
