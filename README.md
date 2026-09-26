# FitLog - Workout Library

FitLog is a responsive workout library and workout planning web application built with Next.js. Users can browse workouts, view workout details, add exercises to today's plan, save workouts for later, and manage their workout plan.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- React Hot Toast
- REST API
- Git & GitHub

## Features

- Browse all workouts from the FitLog API
- View detailed information for each workout
- Add workouts to today's plan
- Save workouts for later
- View and manage today's workout plan
- Mark workouts as done
- Remove workouts from the plan or saved list
- Toast notifications for user actions
- Sort workouts by duration, calories, or rating
- Dynamic Plan and Saved counters
- Responsive design for mobile, tablet, and desktop
- Custom 404 error page
- Loading state while workouts are being fetched

## API

The project uses the FitLog REST API.

### Get All Workouts

https://api.abcz.workers.dev/api/fitlog

### Get Single Workout

https://api.abcz.workers.dev/api/fitlog/:id

## Project Structure

```text
fit-log/
├── app/
│   ├── my-plan/
│   ├── workout/
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   └── WorkoutCard.tsx
│
├── context/
│   └── FitLogContext.tsx
│
├── public/
│   └── assets/
│
├── types/
│   └── workout.ts
│
├── package.json
└── README.md



## Live Demo

https://b14-a6-fit-log-flame.vercel.app

