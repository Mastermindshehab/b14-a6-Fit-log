import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import WorkoutActions from "./WorkoutActions";

interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

interface WorkoutDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetails({
  params,
}: WorkoutDetailsProps) {
  const { id } = await params;

  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-black px-6 pt-20 text-white">
          <div className="text-center">
            <h1 className="text-3xl font-black uppercase">
              Workout Not Found
            </h1>

            <Link
              href="/"
              className="mt-6 inline-block rounded-md bg-lime-400 px-5 py-3 text-sm font-bold text-black"
            >
              GO TO WORKOUTS
            </Link>
          </div>
        </main>
      </>
    );
  }

  const workout: Workout = await response.json();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 pb-20 pt-[110px] text-white md:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Details Card */}
          <div className="grid overflow-hidden rounded-xl border border-zinc-800 bg-[#101114] md:grid-cols-2">

            {/* Left Image */}
            <div className="p-5 md:p-6">
              <div className="h-full min-h-[420px] overflow-hidden rounded-xl">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="flex flex-col p-6 md:p-8">

              {/* Title */}
              <h1 className="text-3xl font-black uppercase leading-tight tracking-tight md:text-4xl">
                {workout.name}
              </h1>

              {/* Description */}
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                {workout.description}
              </p>

              {/* Muscle Groups */}
              <div className="mt-4 flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold text-black"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              {/* Specs */}
              <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800 bg-[#171a20]">

                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                  <span className="text-[11px] font-bold uppercase text-zinc-500">
                    Equipment
                  </span>
                  <span className="text-sm text-zinc-200">
                    {workout.equipment}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                  <span className="text-[11px] font-bold uppercase text-zinc-500">
                    Difficulty
                  </span>
                  <span className="text-sm text-zinc-200">
                    {workout.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                  <span className="text-[11px] font-bold uppercase text-zinc-500">
                    Sets
                  </span>
                  <span className="text-sm text-zinc-200">
                    {workout.sets}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                  <span className="text-[11px] font-bold uppercase text-zinc-500">
                    Reps
                  </span>
                  <span className="text-sm text-zinc-200">
                    {workout.reps}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                  <span className="text-[11px] font-bold uppercase text-zinc-500">
                    Duration
                  </span>
                  <span className="text-sm text-zinc-200">
                    {workout.duration} min
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                  <span className="text-[11px] font-bold uppercase text-zinc-500">
                    Calories
                  </span>
                  <span className="text-sm text-zinc-200">
                    {workout.caloriesBurned} kcal
                  </span>
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-[11px] font-bold uppercase text-zinc-500">
                    Rating
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {workout.rating}
                  </span>
                </div>

              </div>

              {/* Instructions */}
              <div className="mt-7">
                <h2 className="text-lg font-black uppercase">
                  Instructions
                </h2>

                <ol className="mt-4 space-y-3">
                  {workout.instructions.map((instruction, index) => (
                    <li
                      key={instruction}
                      className="flex gap-3 text-sm leading-6 text-zinc-400"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-400 text-[10px] font-bold text-black">
                        {index + 1}
                      </span>

                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Workout Actions */}
              <WorkoutActions workout={workout} />

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}