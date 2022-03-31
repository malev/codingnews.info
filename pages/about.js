import Link from "next/link";

export default function About() {
  return (
    <>
      <h3>Hi!</h3>
      <p>
        My name is Marcos Vanetta, I've been selected as a Knight Mozilla Fellow
        2014 and I'll be working at the Texas Tribune all over the year. I
        opened this blog to share my experiences, discuss about Data Journalism,
        Open Source and some technical stuff.
      </p>
      <p>
        <Link href="/">
          <a>Go Backs</a>
        </Link>
      </p>
    </>
  );
}
