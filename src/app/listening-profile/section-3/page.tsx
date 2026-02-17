"use client";

import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function ListeningProfileSection3Page() {
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
            onClick={() => router.push("/listening-profile/section-2")}
            className="absolute left-0 rounded-full bg-black p-0.5 text-white"
            aria-label="Go back to previous form section"
          >
            <IoMdArrowBack className="h-6 w-6" />
          </button>

          <h1 className="text-center text-base font-semibold leading-tight sm:text-xl">
            Creating Listening Profile
          </h1>
        </div>

        <form className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="socialHandle"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              What&apos;s your social media handle?
            </label>
            <input
              id="socialHandle"
              name="socialHandle"
              type="text"
              placeholder="Type an answer"
              className="w-full rounded-md border border-white/30 bg-white/10 px-4 py-4 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Type your social media handle
            </p>
          </div>

          <div>
            <label
              htmlFor="studioOppositeSex"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              Would you like studio with opposite sex?
            </label>
            <div className="relative">
              <select
                id="studioOppositeSex"
                name="studioOppositeSex"
                defaultValue=""
                onFocus={() => setActiveSelect("studioOppositeSex")}
                onBlur={() => setActiveSelect(null)}
                className="w-full appearance-none rounded-md border border-white/30 bg-white/10 px-4 py-4 pr-11 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option className="bg-black text-white" value="yes">
                  Yes
                </option>
                <option className="bg-black text-white" value="no">
                  N0
                </option>
              </select>
              {activeSelect === "studioOppositeSex" ? (
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
              Would you stay in the same room with gender of opposite sex?
            </p>
          </div>

          <div>
            <label
              htmlFor="allergiesRemedy"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              Do you have allergies, if yes what&apos;s the remedy?
            </label>
            <input
              id="allergiesRemedy"
              name="allergiesRemedy"
              type="text"
              placeholder="Type an answer"
              className="w-full rounded-md border border-white/30 bg-white/10 px-4 py-4 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Allergic to anything you think we should know?
            </p>
          </div>

          <div>
            <label
              htmlFor="emergencyContact"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              Provide an emergency contact
            </label>
            <input
              id="emergencyContact"
              name="emergencyContact"
              type="text"
              placeholder="Type an answer"
              className="w-full rounded-md border border-white/30 bg-white/10 px-4 py-4 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Phone number and name of emergency contact
            </p>
          </div>

          <div>
            <label
              htmlFor="emergencyContactRelationship"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              Relationship with emergency contact
            </label>
            <input
              id="emergencyContactRelationship"
              name="emergencyContactRelationship"
              type="text"
              placeholder="Type an answer"
              className="w-full rounded-md border border-white/30 bg-white/10 px-4 py-4 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Who is this emergency contact to you
            </p>
          </div>

          <div>
            <label
              htmlFor="suggestions"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              got any suggestions
            </label>
            <input
              id="suggestions"
              name="suggestions"
              type="text"
              placeholder="Type and answer"
              className="w-full rounded-md border border-white/30 bg-white/10 px-4 py-4 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Do you have any other information you&apos;d like to provide us?
            </p>
          </div>

          <div className="pt-2">
            <div className="h-px w-full bg-white/30" />
            <div className="mt-3 flex items-start justify-between gap-3">
              <p className="text-sm font-medium leading-snug text-white/85">
                Share my registration data with LTS Calabar content providers for
                marketing purposes.
              </p>
              <label className="mt-0.5 flex items-center">
                <input
                  type="radio"
                  name="marketingConsent"
                  value="yes"
                  className="h-5 w-5 appearance-none rounded-full border border-[#777777] bg-black checked:border-[#1DB954] checked:bg-[#1DB954]"
                />
              </label>
            </div>

            <p className="mt-4 text-xs leading-snug text-white/75">
              By tapping on “Create account”, you agree to the LTS Calabar Terms
              of Use.
            </p>
            <p className="mt-3 text-xs leading-snug text-white/75">
              To learn more about how LTS Calabar collect, uses, shares and
              protects your personal data, Please see the LTS Privacy Policy.
            </p>

            <button
              type="button"
              className="mx-auto mt-5 block w-[60%] rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-white/90"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
