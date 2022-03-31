import Image from "next/image";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import austin from "../assets/austin.png";
import berlin from "../assets/berlin.png";
import rosario from "../assets/rosario.png";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  const photos = [austin, berlin, rosario];
  const photo = photos[Math.floor(Math.random() * photos.length)];
  return (
    <div className={["container", styles.pageContainer].join(" ")}>
      <Header />
      <Navbar />
      <hr className={styles.separation} />
      <div className={styles.image}>
        <Image
          src={photo}
          alt="Picture of the author"
          width={700}
          height={308}
        />
      </div>
      <div className={styles.contentWrap}>{children}</div>
      <hr className={styles.separation} />
      <Footer />
    </div>
  );
}
