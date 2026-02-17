"use client";

import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function ListeningProfileSection2Page() {
  const router = useRouter();
  const [activeSelect, setActiveSelect] = React.useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black px-3 py-5 text-white sm:px-6 sm:py-10">
      <div
        className="mx-auto w-full max-w-[450px] min-h-[calc(100dvh-9.5rem)] rounded-xl p-3.5 sm:min-h-[calc(100dvh-10.5rem)] sm:rounded-2xl sm:p-5"
        style={{ background: "#000000" }}
      >
        <div className="relative mb-4 flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.push("/listening-profile")}
            className="absolute left-0 rounded-full bg-black p-0.5 text-white"
            aria-label="Go back to previous form section"
          >
            <IoMdArrowBack className="h-6 w-6" />
          </button>

          <h1 className="text-center text-base font-semibold leading-tight sm:text-xl">
            Creating Listening Profile
          </h1>
        </div>

        <form className="mt-8 space-y-4 sm:mt-9">
          <div>
            <label
              htmlFor="userType"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              Old or new user?
            </label>
            <div className="relative">
              <select
                id="userType"
                name="userType"
                defaultValue=""
                onFocus={() => setActiveSelect("userType")}
                onBlur={() => setActiveSelect(null)}
                className="w-full appearance-none rounded-md border border-white/30 bg-white/10 px-4 py-4 pr-11 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
              >
                <option value="" disabled>
                  Select option
                </option>
                <option className="bg-black text-white" value="new-member">
                  New member
                </option>
                <option className="bg-black text-white" value="old-member">
                  Old member
                </option>
                <option className="bg-black text-white" value="alumnus">
                  Alumnus
                </option>
              </select>
              {activeSelect === "userType" ? (
                <FaAngleUp
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-base text-white/70"
                  aria-hidden="true"
                />
              ) : (
                <FaAngleDown
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-base text-white/70"
                  aria-hidden="true"
                />
              )}
            </div>
            <p className="mt-1 text-xs font-semibold text-white/75">
              Are you a new or old member?
            </p>
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              What's your status?
            </label>
            <div className="relative">
              <select
                id="status"
                name="status"
                defaultValue=""
                onFocus={() => setActiveSelect("status")}
                onBlur={() => setActiveSelect(null)}
                className="w-full appearance-none rounded-md border border-white/30 bg-white/10 px-4 py-4 pr-11 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
              >
                <option value="" disabled>
                  Select option
                </option>
                <option className="bg-black text-white" value="tm">
                  Team Member - TM
                </option>
                <option className="bg-black text-white" value="tl">
                  Team Leader -tl
                </option>
                <option className="bg-black text-white" value="lcvp">
                  Local Committee Vice President - LCVP
                </option>
                <option className="bg-black text-white" value="lcp">
                  Local Committee President - LCP
                </option>
              </select>
              {activeSelect === "status" ? (
                <FaAngleUp
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-base text-white/70"
                  aria-hidden="true"
                />
              ) : (
                <FaAngleDown
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-base text-white/70"
                  aria-hidden="true"
                />
              )}
            </div>
            <p className="mt-1 text-xs font-semibold text-white/75">
              Please select your role
            </p>
          </div>

          <div>
            <label
              htmlFor="genre"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              Pick your genre
            </label>
            <div className="relative">
              <select
                id="genre"
                name="genre"
                defaultValue=""
                onFocus={() => setActiveSelect("genre")}
                onBlur={() => setActiveSelect(null)}
                className="w-full appearance-none rounded-md border border-white/30 bg-white/10 px-4 py-4 pr-11 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
              >
                <option value="" disabled>
                  select option
                </option>
                <option className="bg-black text-white" value="bd-ewa">
                  BD/EWA
                </option>
                <option className="bg-black text-white" value="fl">
                  F&amp;L
                </option>
                <option className="bg-black text-white" value="icx">
                  iCX
                </option>
                <option className="bg-black text-white" value="mx">
                  MX
                </option>
                <option className="bg-black text-white" value="ogt">
                  oGT
                </option>
                <option className="bg-black text-white" value="ogv">
                  oGV
                </option>
                <option className="bg-black text-white" value="eb">
                  EB
                </option>
              </select>
              {activeSelect === "genre" ? (
                <FaAngleUp
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-base text-white/70"
                  aria-hidden="true"
                />
              ) : (
                <FaAngleDown
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-base text-white/70"
                  aria-hidden="true"
                />
              )}
            </div>
            <p className="mt-1 text-xs font-semibold text-white/75">
              Please select your functional area(FA)
            </p>
          </div>

          <div>
            <label
              htmlFor="firstParty"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              Is this your first listening party?
            </label>
            <div className="relative">
              <select
                id="firstParty"
                name="firstParty"
                defaultValue=""
                onFocus={() => setActiveSelect("firstParty")}
                onBlur={() => setActiveSelect(null)}
                className="w-full appearance-none rounded-md border border-white/30 bg-white/10 px-4 py-4 pr-11 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
              >
                <option value="" disabled>
                  select option
                </option>
                <option className="bg-black text-white" value="yes">
                  Yes
                </option>
                <option className="bg-black text-white" value="no">
                  No
                </option>
              </select>
              {activeSelect === "firstParty" ? (
                <FaAngleUp
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-base text-white/70"
                  aria-hidden="true"
                />
              ) : (
                <FaAngleDown
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-base text-white/70"
                  aria-hidden="true"
                />
              )}
            </div>
            <p className="mt-1 text-xs font-semibold text-white/75">
              Is this your first AIESEC conference?
            </p>
          </div>

          <div>
            <label
              htmlFor="expectations"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              wWat are your expectations?
            </label>
            <input
              id="expectations"
              name="expectations"
              type="text"
              placeholder="type an answer"
              className="w-full rounded-md border border-white/30 bg-white/10 px-4 py-4 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              What do you expect from the OC team?
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
