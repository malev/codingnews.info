import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";

import {
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <ul className={styles.navbarList}>
        <li>
          <a href="https://twitter.com/malev">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
        <li>
          <a href="https://github.com/malev">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/marcosvanetta/">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
