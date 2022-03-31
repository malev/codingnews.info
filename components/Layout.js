import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={["container", styles.pageContainer].join(" ")}>
      <Header />
      <hr className={styles.separation} />
      <Navbar />
      <hr className={styles.separation} />
      <div className={styles.contentWrap}>{children}</div>
      <hr className={styles.separation} />
      <Footer />
    </div>
  );
}
