"use client";

import { useEffect, useState } from "react";
import { Workout } from "../types/workout";
import WorkoutCard from "../components/WorkoutCard";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  // Sort option
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // Create sorted copy of workouts
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-lime-400"></div>

          <p>Loading workouts...</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black pt-[60px] pb-20 text-white">
        <Hero />

        <section
          id="library"
          className="mx-auto max-w-7xl scroll-mt-24 px-6 pt-12 md:px-8"
        >
          {/* Library Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight">
                THE LIBRARY
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Twelve lifts covering every major muscle group.
              </p>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">
                Sort By
              </span>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-md border border-zinc-700 bg-[#15171c] px-3 py-2 text-xs text-white outline-none"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Workout Cards */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        </section>
      </main>

       <Footer />
    </>
  );
}