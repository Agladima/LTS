"use client";

import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import GreenDropdown from "@/app/components/GreenDropdown";
import {
  readRegistrationDraft,
  writeRegistrationDraft,
} from "@/app/lib/registrationStorage";

export default function ListeningProfileSection2Page() {
  const router = useRouter();
  const savedDraft = React.useMemo(() => readRegistrationDraft(), []);
  const [userType, setUserType] = React.useState(savedDraft.userType ?? "");
  const [status, setStatus] = React.useState(savedDraft.status ?? "");
  const [genre, setGenre] = React.useState(savedDraft.genre ?? "");
  const [firstParty, setFirstParty] = React.useState(savedDraft.firstParty ?? "");
  const [expectations, setExpectations] = React.useState(
    savedDraft.expectations ?? "",
  );

  React.useEffect(() => {
    writeRegistrationDraft({
      userType,
      status,
      genre,
      firstParty,
      expectations,
    });
  }, [userType, status, genre, firstParty, expectations]);

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
              Old or New user?
            </label>
            <GreenDropdown
              id="userType"
              name="userType"
              value={userType}
              placeholder="Select option"
              onChange={setUserType}
              options={[
                { value: "new-member", label: "New member" },
                { value: "old-member", label: "Old member" },
                { value: "alumnus", label: "Alumnus" },
              ]}
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Are you a new or old member?
            </p>
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              What&apos;s your status?
            </label>
            <GreenDropdown
              id="status"
              name="status"
              value={status}
              placeholder="Select option"
              onChange={setStatus}
              options={[
                { value: "tm", label: "Team Member - TM" },
                { value: "tl", label: "Team Leader -TL" },
                {
                  value: "lcvp",
                  label: "Local Committee Vice President - LCVP",
                },
                { value: "lcp", label: "Local Committee President - LCP" },
              ]}
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Please select your role
            </p>
          </div>

          <div>
            <label
              htmlFor="genre"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              Pick your Genre
            </label>
            <GreenDropdown
              id="genre"
              name="genre"
              value={genre}
              placeholder="Select option"
              onChange={setGenre}
              options={[
                { value: "bd-ewa", label: "BD/EWA" },
                { value: "fl", label: "F&L" },
                { value: "icx", label: "iCX" },
                { value: "mx", label: "MX" },
                { value: "ogt", label: "oGT" },
                { value: "ogv", label: "oGV" },
                { value: "mkt", label: "MKT" },
                { value: "eb", label: "EB" },
              ]}
            />
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
            <GreenDropdown
              id="firstParty"
              name="firstParty"
              value={firstParty}
              placeholder="Select option"
              onChange={setFirstParty}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Is this your first AIESEC conference?
            </p>
          </div>

          <div>
            <label
              htmlFor="expectations"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              What are your expectations?
            </label>
            <input
              id="expectations"
              name="expectations"
              type="text"
              required
              placeholder="Type an answer"
              value={expectations}
              onChange={(event) => setExpectations(event.target.value)}
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
