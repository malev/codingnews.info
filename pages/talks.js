import Link from "next/link";

export default function Talks() {
  return (
    <>
      <h2>Hi!</h2>
      <p>
        My name is Marcos Vanetta and I've been talking about data journalist,
        coding and stuff, here are my slides:
      </p>
      <ul>
        <li>
          <a href="/slides/data-cleaning.html">
            Limpieza de datos - DataBootCamp (Mex - 2014)
          </a>
        </li>
        <li>
          <a href="/slides/data-extraction.html">
            Extracción de datos - DataBootCamp (Mex - 2014)
          </a>
        </li>
        <li>
          <a href="/slides/texastribune.html">
            TheTexasTribune - Cómo trabajamos?
          </a>
        </li>
        <li>
          <a href="/slides/piratebox_hands_on.html">PirateBox - Hands on!</a>
        </li>
        <li>
          <a href="/slides/experiencias_de_un_desarrollo.html">
            Mapa76: experiencia de un desarrollo open source
          </a>
        </li>
        <li>
          <a href="/slides/environments.html">
            Reproducibility of your development environment
          </a>
        </li>
      </ul>
      <p>
        Go back to the{" "}
        <Link href="/">
          <a>Blog</a>
        </Link>
      </p>
    </>
  );
}
