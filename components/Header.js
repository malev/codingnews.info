import styles from "../styles/Home.module.css";

export default function Header() {
  return (
    <section className={styles.header}>
      <h2 className="title">
        coding<span className={styles.news}>news</span>.info
      </h2>
      <p>A blog about learning web3</p>
    </section>
  );
}
