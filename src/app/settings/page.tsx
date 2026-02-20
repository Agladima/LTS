"use client";

import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const creditMembers = [
  {
    image: "/francis.jpeg",
    name: "Francis Adalikwu",
    title: "Marketing Manager - 26.227",
  },
  {
    image: "/ocp.png",
    name: "Alawa Augustine",
    title: "Frontend Developer (OCP)",
  },
  {
    image: "/ocvp.jpeg",
    name: "Riches Bassey",
    title: "UI/UX Designer (OCVP DIXP)",
  },
  { image: "/pasc.jpeg", name: "Betiang Paschal", title: "Backend Developer" },
  { image: "/odey.jpeg", name: "Odey Victoria", title: "LTS Photographer." },
  { image: "/sonia.jpeg", name: "Chinyere Sonia", title: "CopyWriter" },
  { image: "/tamen.jpeg", name: "Tar Favour", title: "LTS Videographer " },
  { image: "/eyo.jpg", name: "Eyo Ibok", title: "Graphics Designer" },
  { image: "/james.jpeg", name: "Gbaeren James", title: "VIdeo Editor" },
];

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
          <p className="mt-1 text-sm text-white/80">
            Number of Premium listeners
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-base font-semibold text-white">
            Credits and Acknowledgement
          </h2>
          <p className="mt-1 text-sm text-white/75">LTS - DIXP Team 26.27</p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {creditMembers.map((member, index) => (
              <div key={`credit-member-${index}`} className="text-center">
                <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-white/10">
                  <img
                    src={member.image}
                    alt={`${member.name} placeholder`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-2 text-xs font-bold text-white">
                  {member.name}
                </p>
                <p className="text-[11px] text-white/70">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
