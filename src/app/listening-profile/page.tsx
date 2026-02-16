"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ListeningProfilePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-[450px]">
        <button
          type="button"
          onClick={() => router.push("/welcome")}
          className="mb-4 text-2xl leading-none text-white/90"
          aria-label="Go back to welcome page"
        >
          ←
        </button>

        <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
          Creating Listening Profile
        </h1>

        <form className="mt-6 space-y-4 rounded-2xl bg-[#121212] p-4 sm:p-5">
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm text-white/85">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-white/20 bg-black/50 px-3 py-2 text-sm text-white outline-none focus:border-[#1DB954]"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-white/85">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-white/20 bg-black/50 px-3 py-2 text-sm text-white outline-none focus:border-[#1DB954]"
            />
          </div>

          <div>
            <label
              htmlFor="favoriteSound"
              className="mb-1 block text-sm text-white/85"
            >
              Favorite leadership sound
            </label>
            <input
              id="favoriteSound"
              name="favoriteSound"
              type="text"
              placeholder="e.g. Bold, calm, energetic"
              className="w-full rounded-lg border border-white/20 bg-black/50 px-3 py-2 text-sm text-white outline-none focus:border-[#1DB954]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#1DB954] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#1ED760]"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
