import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

export default function Layout({ children }) {
  return (
    <div className="container">
      <Header />
      <hr className={styles.separation} />
      <Navbar />
      <hr className={styles.separation} />
      {children}
      <hr className={styles.separation} />
      <Footer />
    </div>
  );
}
