import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section>
        <h1 className="text-4xl ">Colour-pal-it</h1>
        <Link href="/generator">
          <button className="bg-blue-500 py-2 px-4 text-xl text-white">
            Get Started
          </button>
        </Link>
      </section>
    </main>
  );
}
