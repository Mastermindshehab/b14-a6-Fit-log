"use client";

import { CalendarPlus, Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import { Workout } from "../../../types/workout";
import { useFitLog } from "../../../context/FitLogContext";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const {
    plan,
    saved,
    addToPlan,
    saveForLater,
  } = useFitLog();

  const alreadyInPlan = plan.some(
    (item) => item.id === workout.id
  );

  const alreadySaved = saved.some(
    (item) => item.id === workout.id
  );

  const planFull = plan.length >= 5;

  // Add to today's plan
  const handleAddToPlan = () => {
    if (alreadyInPlan) {
      toast.error("This workout is already in your plan.");
      return;
    }

    if (planFull) {
      toast.error("Your plan is full. You can add up to 5 workouts.");
      return;
    }

    addToPlan(workout);

    toast.success(
      `${workout.name} added to today's plan.`
    );
  };

  // Save for later
  const handleSaveForLater = () => {
    if (alreadySaved) {
      toast.error("This workout is already saved.");
      return;
    }

    saveForLater(workout);

    toast.success(
      `${workout.name} saved for later.`
    );
  };

  return (
    <div className="mt-7 flex flex-wrap gap-3">

      {/* Add to Plan */}
      <button
        onClick={handleAddToPlan}
        disabled={alreadyInPlan || planFull}
        className="flex items-center gap-2 rounded-md bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CalendarPlus size={16} />

        {alreadyInPlan
          ? "Already in plan"
          : planFull
            ? "Plan is full"
            : "Add to today's plan"}
      </button>

      {/* Save for Later */}
      <button
        onClick={handleSaveForLater}
        disabled={alreadySaved}
        className="flex items-center gap-2 rounded-md border border-zinc-700 px-5 py-3 text-sm font-bold text-white transition hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Bookmark size={16} />

        {alreadySaved
          ? "Saved"
          : "Save for later"}
      </button>

    </div>
  );
}