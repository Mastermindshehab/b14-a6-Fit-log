import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className=" mt-10 bg-black px-6 pt-0 text-white md:px-8">
      
      <div className="mx-auto mt-10 grid max-w-7xl items-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 px-8 py-10 md:grid-cols-2 md:px-10 md:py-10">

        {/* Left Content */}
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-bold tracking-[0.18em] text-lime-400">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-zinc-400 md:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-lime-400 px-5 py-3 text-xs font-bold text-black transition hover:bg-lime-300"
          >
            BROWSE WORKOUTS
            <span className="text-sm">→</span>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/assets/banner.png"
            alt="FitLog workout"
            width={600}
            height={450}
            priority
            className="h-[250px] w-auto object-contain md:h-[300px]"
          />
        </div>

      </div>
    </section>
  );
}