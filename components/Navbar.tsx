"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "../context/FitLogContext";

export default function Navbar() {
  const { plan, saved } = useFitLog();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isMyPlan = pathname === "/my-plan";

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-zinc-800 bg-black">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />

          <span className="text-xl font-black tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isHome
                ? "bg-lime-400 text-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan?tab=plan"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isMyPlan
                ? "bg-lime-400 text-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Plan & Saved */}
        <div className="flex items-center gap-5">
          {/* Plan */}
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-2 text-sm text-white transition hover:text-zinc-300"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1.5 text-[10px] font-bold text-black">
              {plan.length}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-zinc-700 bg-[#15171c] px-1.5 text-[10px] font-medium text-zinc-300">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}