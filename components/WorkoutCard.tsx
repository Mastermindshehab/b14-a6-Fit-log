import Link from "next/link";
import { Workout } from "../types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/workout/${workout.id}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#17181c] transition duration-300 hover:border-zinc-700">

        {/* Image */}
        <div className="aspect-[2.05/1] w-full overflow-hidden">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="px-5 py-4">

          {/* Muscle Groups */}
          <div className="mb-3 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold uppercase text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h2 className="text-[16px] font-black uppercase tracking-wide text-white">
            {workout.name}
          </h2>

          {/* Equipment */}
          <p className="mt-1 text-[11px] text-zinc-500">
            {workout.equipment}
          </p>

          {/* Divider */}
          <div className="my-3 border-t border-zinc-800"></div>

          {/* Stats */}
          <div className="flex items-center gap-5 text-[11px] text-zinc-400">

            {/* Duration */}
            <span className="flex items-center gap-1">
              <span className="text-zinc-500">◷</span>
              {workout.duration} min
            </span>

            {/* Calories */}
            <span className="flex items-center gap-1">
              <span className="text-zinc-500">●</span>
              {workout.caloriesBurned} kcal
            </span>

            {/* Rating */}
            <span className="flex items-center gap-1">
              <span className="text-zinc-500">☆</span>
              {workout.rating}
            </span>

          </div>
        </div>
      </div>
    </Link>
  );
}