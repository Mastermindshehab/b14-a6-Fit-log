"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useFitLog } from "../../context/FitLogContext";

function MyPlanContent() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = useFitLog();

  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<
    "plan" | "saved"
  >("plan");

  const [sortBy, setSortBy] = useState("duration");

  const [loading, setLoading] = useState(true);

  /*
    URL অনুযায়ী active tab পরিবর্তন হবে।

    /my-plan?tab=plan
    => Today's Plan

    /my-plan?tab=saved
    => Saved
  */
  useEffect(() => {
    if (tab === "saved") {
      setActiveTab("saved");
    } else {
      setActiveTab("plan");
    }
  }, [tab]);

  /*
    Page load হওয়ার সময় loading দেখাবে।
  */
  useEffect(() => {
    const loadPage = async () => {
      try {
        await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );
      } catch (error) {
        console.error(
          "Failed to load workouts:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, []);

  /*
    কোন tab active তার উপর ভিত্তি করে
    workout list নেওয়া হবে।
  */
  const currentWorkouts =
    activeTab === "plan"
      ? [...plan]
      : [...saved];

  /*
    Sort
  */
  currentWorkouts.sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return (
        a.caloriesBurned -
        b.caloriesBurned
      );
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  /*
    Total minutes
  */
  const totalMinutes =
    currentWorkouts.reduce(
      (total, workout) =>
        total + workout.duration,
      0
    );

  /*
    Total calories
  */
  const totalCalories =
    currentWorkouts.reduce(
      (total, workout) =>
        total + workout.caloriesBurned,
      0
    );

  /*
    Mark as Done
  */
  const handleMarkAsDone = (
    workoutId: number,
    workoutName: string
  ) => {
    removeFromPlan(workoutId);

    toast.success(
      `${workoutName} marked as done.`
    );
  };

  /*
    Remove workout
  */
  const handleRemove = (
    workoutId: number,
    workoutName: string
  ) => {
    if (activeTab === "plan") {
      removeFromPlan(workoutId);

      toast.success(
        `${workoutName} removed from your plan.`
      );
    } else {
      removeFromSaved(workoutId);

      toast.success(
        `${workoutName} removed from saved.`
      );
    }
  };

  /*
    Change tab manually
  */
  const handleTabChange = (
    tabName: "plan" | "saved"
  ) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#101114] text-white">
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-[110px] md:px-8">

          {/* Page Heading */}
          <div className="mb-6">
            <h1 className="text-3xl font-black uppercase tracking-tight">
              MY PLAN
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Cap of five lifts for today.
              Finish them, then load more.
            </p>
          </div>

          {/* Metrics */}
          <div className="mb-6 grid overflow-hidden rounded-xl border border-zinc-800 bg-[#15171c] sm:grid-cols-3">

            {/* Exercises */}
            <div className="border-b border-zinc-800 px-5 py-6 sm:border-b-0 sm:border-r">
              <p className="text-xs text-zinc-500">
                Exercises
              </p>

              <p className="mt-1 text-3xl font-black text-lime-400">
                {currentWorkouts.length}
              </p>
            </div>

            {/* Minutes */}
            <div className="border-b border-zinc-800 px-5 py-6 sm:border-b-0 sm:border-r">
              <p className="text-xs text-zinc-500">
                Minutes
              </p>

              <p className="mt-1 text-3xl font-black text-white">
                {totalMinutes}
              </p>
            </div>

            {/* Calories */}
            <div className="px-5 py-6">
              <p className="text-xs text-zinc-500">
                Calories
              </p>

              <p className="mt-1 text-3xl font-black text-white">
                {totalCalories}
              </p>
            </div>
          </div>

          {/* Tabs + Sort */}
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            {/* Tabs */}
            <div className="flex w-fit rounded-lg border border-zinc-800 bg-[#15171c] p-1">

              {/* Today's Plan */}
              <button
                onClick={() =>
                  handleTabChange("plan")
                }
                className={`rounded-md px-4 py-2 text-xs font-medium transition ${
                  activeTab === "plan"
                    ? "bg-[#242731] text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                Today&apos;s Plan
              </button>

              {/* Saved */}
              <button
                onClick={() =>
                  handleTabChange("saved")
                }
                className={`rounded-md px-4 py-2 text-xs font-medium transition ${
                  activeTab === "saved"
                    ? "bg-[#242731] text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                Saved
              </button>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">
                Sort By
              </span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
                className="rounded-md border border-zinc-700 bg-[#15171c] px-3 py-2 text-xs text-white outline-none"
              >
                <option value="duration">
                  Duration
                </option>

                <option value="calories">
                  Calories
                </option>

                <option value="rating">
                  Rating
                </option>
              </select>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-zinc-800">
              <div className="text-center">

                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-lime-400"></div>

                <p className="text-sm text-zinc-500">
                  Loading workouts...
                </p>

              </div>
            </div>

          ) : currentWorkouts.length === 0 ? (

            /* Empty State */
            <div className="flex min-h-[310px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-[#101114] text-center">

              <h2 className="text-lg font-black uppercase">
                NOTHING HERE YET
              </h2>

              <p className="mt-2 text-xs text-zinc-500">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/#library"
                className="mt-5 rounded-full bg-lime-400 px-5 py-2.5 text-xs font-bold text-black transition hover:bg-lime-300"
              >
                Go to workouts
              </Link>

            </div>

          ) : (

            /* Workout List */
            <div className="space-y-3">

              {currentWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-[#17181c] p-3 transition hover:border-zinc-700 sm:flex-row sm:items-center"
                >

                  {/* Image */}
                  <div className="h-20 w-full shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-28">

                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="h-full w-full object-cover"
                    />

                  </div>

                  {/* Information */}
                  <div className="min-w-0 flex-1">

                    <h2 className="text-sm font-black uppercase text-white">
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                      {workout.equipment}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-zinc-400">

                      <span>
                        ◷ {workout.duration} min
                      </span>

                      <span>
                        ♨ {workout.caloriesBurned} kcal
                      </span>

                      <span>
                        ☆ {workout.rating}
                      </span>

                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2">

                    {/* View Details */}
                    <Link
                      href={`/workout/${workout.id}`}
                      className="rounded-full border border-zinc-600 px-3 py-1.5 text-[10px] font-bold text-white transition hover:border-white"
                    >
                      View Details
                    </Link>

                    {/* Mark as Done */}
                    {activeTab === "plan" && (
                      <button
                        onClick={() =>
                          handleMarkAsDone(
                            workout.id,
                            workout.name
                          )
                        }
                        className="rounded-full bg-lime-400 px-3 py-1.5 text-[10px] font-bold text-black transition hover:bg-lime-300"
                      >
                        ✓ Mark as Done
                      </button>
                    )}

                    {/* Remove */}
                    <button
                      onClick={() =>
                        handleRemove(
                          workout.id,
                          workout.name
                        )
                      }
                      className="px-2 text-sm font-bold text-zinc-500 transition hover:text-red-400"
                    >
                      ×
                    </button>

                  </div>
                </div>
              ))}

            </div>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}


/*
  Suspense boundary

  useSearchParams() ব্যবহার করার কারণে
  Next.js production build-এর জন্য
  MyPlanContent-কে Suspense-এর ভিতরে রাখা হয়েছে।
*/
export default function MyPlan() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#101114] text-white">
          <div className="text-center">

            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-lime-400"></div>

            <p className="text-sm text-zinc-500">
              Loading workouts...
            </p>

          </div>
        </main>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
}