import Head from "next/head";
import Link from "next/link";
import { api } from "../lib";
import styles from "../styles/ArticleRow.module.css";

function ArticleRow({ title, date, slug }) {
  return (
    <li className={styles.row}>
      <div>
        <Link href={`/posts/${slug}`}>
          <a className={styles.title}>{title}</a>
        </Link>
        <span className={styles.date}>
          {new Date(parseInt(date + "000", 10)).toLocaleDateString("en-US")}
        </span>
      </div>
    </li>
  );
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>codingnews.info | A blog about learning web3</title>
      </Head>
      <div className="row">
        <div className="tweleve column">
          <ul style={{ listStyle: "none" }}>
            {articles.map((article, key) => (
              <ArticleRow key={key} {...article} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      articles: api.getAllArticles(["title", "slug", "date"]),
    },
  };
}
