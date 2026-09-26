import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#101114]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center md:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <img
            src="/assets/logo.png"
            alt="FitLog"
            className="h-6 w-6 object-contain"
          />

          <span className="text-sm font-black">
            FITLOG
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-xs text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}