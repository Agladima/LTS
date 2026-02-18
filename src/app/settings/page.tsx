"use client";

import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black px-3 py-5 text-white sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-[450px] min-h-[calc(100dvh-9.5rem)] rounded-xl p-3.5 sm:min-h-[calc(100dvh-10.5rem)] sm:rounded-2xl sm:p-5">
        <div className="relative mb-5 flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.push("/welcome")}
            className="absolute left-0 rounded-full bg-black p-0.5 text-white"
            aria-label="Go back to welcome page"
          >
            <IoMdArrowBack className="h-6 w-6" />
          </button>

          <h1 className="text-center text-base font-semibold leading-tight sm:text-xl">
            Settings
          </h1>
        </div>

        <div className="text-left">
          <p className="text-4xl font-bold leading-none">0</p>
          <p className="mt-1 text-sm text-white/80">Number of Premium listeners</p>
        </div>
      </div>
    </main>
  );
}
