import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <div className="font-righteous flex justify-between p-10 text-xl md:text-3xl ">
        <h1>Colour-pal-it</h1>
        <Link href="/">
          <h1>home</h1>
        </Link>
      </div>
    </nav>
  );
}
