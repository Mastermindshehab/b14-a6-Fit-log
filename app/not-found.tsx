import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="text-center">

        <p className="text-sm font-bold tracking-[0.2em] text-lime-400">
          FITLOG
        </p>

        <h1 className="mt-4 text-6xl font-black">
          404
        </h1>

        <h2 className="mt-3 text-xl font-bold uppercase">
          Page Not Found
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
        >
          GO TO WORKOUTS
        </Link>

      </div>
    </main>
  );
}