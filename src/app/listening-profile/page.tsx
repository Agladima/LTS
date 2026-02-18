"use client";

import React, { useMemo, useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import GreenDropdown from "@/app/components/GreenDropdown";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatIsoDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (isoDate: string) => {
  if (!isoDate) return "mm/dd/yyyy";
  const [year, month, day] = isoDate.split("-");
  return `${month}/${day}/${year}`;
};

export default function ListeningProfilePage() {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const calendarCells = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();
    const cells: { iso: string; day: number; inCurrentMonth: boolean }[] = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i -= 1) {
      const day = daysInPreviousMonth - i;
      const date = new Date(year, month - 1, day);
      cells.push({ iso: formatIsoDate(date), day, inCurrentMonth: false });
    }

    for (let day = 1; day <= daysInCurrentMonth; day += 1) {
      const date = new Date(year, month, day);
      cells.push({ iso: formatIsoDate(date), day, inCurrentMonth: true });
    }

    const remainingCells = 42 - cells.length;
    for (let day = 1; day <= remainingCells; day += 1) {
      const date = new Date(year, month + 1, day);
      cells.push({ iso: formatIsoDate(date), day, inCurrentMonth: false });
    }

    return cells;
  }, [calendarMonth]);

  const handlePickDate = (iso: string) => {
    setDob(iso);
    setIsCalendarOpen(false);
  };

  return (
    <main className="min-h-screen bg-black px-3 py-5 text-white sm:px-6 sm:py-10">
      <div
        className="mx-auto w-full max-w-[450px] min-h-[calc(100dvh-9.5rem)] rounded-xl p-3.5 sm:min-h-[calc(100dvh-10.5rem)] sm:rounded-2xl sm:p-5"
        style={{
          background: "linear-gradient(to bottom, #1ED760 0%, #121212 53%)",
        }}
      >
        <div className="relative mb-4 flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.push("/welcome")}
            className="absolute left-0 rounded-full bg-black p-0.5 text-white"
            aria-label="Go back to welcome page"
          >
            <IoMdArrowBack className="h-6 w-6" />
          </button>

          <h1 className="text-center text-base font-semibold leading-tight sm:text-xl">
            Creating Listening Profile
          </h1>
        </div>

        <div className="mx-auto mt-6 mb-5 flex aspect-square w-full max-w-[200px] flex-col items-center justify-center rounded-2xl border border-white/30 bg-white/10 p-4 text-center shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md sm:mt-8 sm:mb-6 sm:max-w-[220px] sm:p-5">
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center text-center"
          >
            <IoCameraOutline className="mx-auto mb-3 h-12 w-12 text-[#B3B3B3] sm:mb-4 sm:h-14 sm:w-14" />
            <p className="text-sm font-semibold leading-tight text-[#B3B3B3] sm:text-base">
              Upload your
            </p>
            <p className="text-sm font-semibold leading-tight text-[#B3B3B3] sm:text-base">
              Album Art/Profile
            </p>
            <p className="text-sm font-semibold leading-tight text-[#B3B3B3] sm:text-base">
              Picture
            </p>
          </button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            aria-label="Upload album art or profile picture"
          />
        </div>

        <form className="mt-5 space-y-4 sm:mt-6">
          <div>
            <label
              htmlFor="fullName"
              className="mb-1 block text-sm text-white/85"
            >
              What should we call you?
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
              className="w-full rounded-md border border-white/30 bg-white/10 px-3 py-2.5 text-sm text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-white/85">
              What&apos;s your email?
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              className="w-full rounded-md border border-white/30 bg-white/10 px-3 py-2.5 text-sm text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm text-white/85">
              What&apos;s your phone number?
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone"
              className="w-full rounded-md border border-white/30 bg-white/10 px-3 py-2.5 text-sm text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="mb-1 block text-sm text-white/85"
            >
              What&apos;s your gender?
            </label>
            <GreenDropdown
              id="gender"
              name="gender"
              value={gender}
              placeholder="Select gender"
              onChange={setGender}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="dob" className="mb-1 block text-sm text-white/85">
              What&apos;s your date of birth?
            </label>
            <input type="hidden" id="dob" name="dob" value={dob} />
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCalendarOpen((value) => !value)}
                className="flex w-full items-center justify-between rounded-md border border-white/30 bg-white/10 px-3 py-2.5 text-left text-sm text-white backdrop-blur-md outline-none transition focus:border-[#1DB954]"
              >
                <span className={dob ? "text-white" : "text-white/60"}>
                  {formatDisplayDate(dob)}
                </span>
                <span className="text-white/70">📅</span>
              </button>

              {isCalendarOpen ? (
                <div className="absolute bottom-[calc(100%+8px)] left-0 z-30 w-full rounded-xl border border-white/20 bg-[#0F0F0F] p-2.5 shadow-2xl sm:p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setCalendarMonth(
                          (prev) =>
                            new Date(
                              prev.getFullYear(),
                              prev.getMonth() - 1,
                              1,
                            ),
                        )
                      }
                      className="rounded bg-white/10 px-2 py-1 text-[11px] text-white hover:bg-white/20"
                    >
                      Prev
                    </button>
                    <p className="text-xs font-semibold text-[#1ED760] sm:text-sm">
                      {MONTH_NAMES[calendarMonth.getMonth()]}{" "}
                      {calendarMonth.getFullYear()}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setCalendarMonth(
                          (prev) =>
                            new Date(
                              prev.getFullYear(),
                              prev.getMonth() + 1,
                              1,
                            ),
                        )
                      }
                      className="rounded bg-white/10 px-2 py-1 text-[11px] text-white hover:bg-white/20"
                    >
                      Next
                    </button>
                  </div>

                  <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] text-white/60 sm:text-[11px]">
                    {WEEK_DAYS.map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {calendarCells.map((cell) => {
                      const isSelected = dob === cell.iso;
                      return (
                        <button
                          key={cell.iso}
                          type="button"
                          onClick={() => handlePickDate(cell.iso)}
                          className={`h-8 rounded text-xs transition ${
                            isSelected
                              ? "bg-[#1ED760] text-black"
                              : cell.inCurrentMonth
                                ? "bg-white/10 text-white hover:bg-white/20"
                                : "bg-transparent text-white/35 hover:bg-white/10"
                          }`}
                        >
                          {cell.day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
