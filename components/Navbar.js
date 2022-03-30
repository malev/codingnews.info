import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";

function NavbarItem({ path, name }) {
  const router = useRouter();

  const classes =
    router.asPath === path ? [styles.current] : [styles.navbarLink];

  return (
    <li className={styles.navbarItem}>
      <Link href={path}>
        <a className={classes.join(" ")}>{name}</a>
      </Link>
    </li>
  );
}

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <NavbarItem path="/" name="Home" />
        <NavbarItem path="/about" name="About" />
        <NavbarItem path="/talks" name="Talks" />
      </ul>
    </nav>
  );
}
