"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { apiGet } from "@/app/lib/api";
import {
  getListeningProfilesCount,
  getPremiumListenersCount,
  type RegistrationStatsResponse,
} from "@/app/lib/stats";

export default function StatisticsPage() {
  const router = useRouter();
  const eventDate = React.useMemo(
    () => new Date("2026-03-12T00:00:00"),
    [],
  );
  const [listeningProfiles, setListeningProfiles] = React.useState(0);
  const [premiumListeners, setPremiumListeners] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  React.useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  React.useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      try {
        const stats = await apiGet<RegistrationStatsResponse>(
          "/registration/stats/",
        );
        if (!isMounted) return;
        setListeningProfiles(getListeningProfilesCount(stats));
        setPremiumListeners(getPremiumListenersCount(stats));
      } catch (error) {
        console.error("Failed to load registration stats:", error);
      }
    };

    loadStats();
    const interval = window.setInterval(loadStats, 15000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black px-3 py-5 text-white sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-[450px] min-h-[calc(100dvh-9.5rem)] rounded-xl p-3.5 sm:min-h-[calc(100dvh-10.5rem)] sm:rounded-2xl sm:p-5">
        <section
          className="relative mt-2 mx-auto h-[300px] w-[90%] overflow-hidden rounded-2xl p-2.5 sm:h-[330px] sm:p-3"
          style={{
            backgroundImage: "url('/frame6.jpeg')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 rounded-2xl bg-[#47464B] p-2 sm:p-2.5">
            <div className="flex items-start gap-2 sm:gap-3">
              <div
                className="relative h-[112px] w-[112px] flex-none overflow-hidden rounded-md sm:h-[124px] sm:w-[124px]"
                style={{
                  backgroundImage: "url('/frame1.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <img
                  src="/layer1.png"
                  alt="LTS logo"
                  className="absolute left-2 top-2 z-20 h-3.5 w-auto sm:h-4"
                />
              </div>

              <div className="flex flex-1 flex-col justify-start py-0">
                <p className="text-[10px] uppercase tracking-wide text-white/70 sm:text-[11px]">
                  Upcoming Event
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug text-white sm:text-base">
                  LTS 2026: The Listening
                </p>
                <p className="text-sm font-semibold leading-snug text-white sm:text-base">
                  Party
                </p>
                <p className="mt-1 text-xs text-white/80 sm:text-sm">AiCAL</p>

                <button
                  type="button"
                  onClick={() => router.push("/listening-profile")}
                  className="mt-2 w-fit rounded-full bg-[#1DB954] px-4 py-1 text-xs font-semibold text-black transition hover:bg-[#1ED760] sm:text-sm"
                >
                  Join Listening Party
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 left-1/2 z-10 w-[92%] -translate-x-1/2 rounded-md border border-white/25 bg-white/10 px-3 py-2.5 backdrop-blur-md">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="border-r border-white/20 pr-2">
                <p className="text-sm font-bold text-white">{timeLeft.days}</p>
                <p className="text-[10px] uppercase text-white/80">Days</p>
              </div>
              <div className="border-r border-white/20 pr-2">
                <p className="text-sm font-bold text-white">{timeLeft.hours}</p>
                <p className="text-[10px] uppercase text-white/80">Hours</p>
              </div>
              <div className="border-r border-white/20 pr-2">
                <p className="text-sm font-bold text-white">
                  {timeLeft.minutes}
                </p>
                <p className="text-[10px] uppercase text-white/80">Minutes</p>
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {timeLeft.seconds}
                </p>
                <p className="text-[10px] uppercase text-white/80">Seconds</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-5 w-[90%]">
          <p className="text-3xl font-bold leading-none text-white">
            {listeningProfiles}
          </p>
          <p className="mt-1 text-sm text-white/80">Listening Profiles</p>

          <p className="mt-4 text-3xl font-bold leading-none text-white">
            {premiumListeners}
          </p>
          <p className="mt-1 text-sm text-white/80">Premium Listeners</p>
        </div>

        <section
          className="relative mt-8 h-[360px] w-full overflow-hidden rounded-md p-2.5 sm:h-[400px] sm:p-3"
          style={{
            backgroundImage: "url('/frame4.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 rounded-md bg-[#47464B] p-2 sm:p-2.5">
            <div className="flex items-start gap-2 sm:gap-3">
              <div
                className="relative h-[112px] w-[112px] flex-none overflow-hidden rounded-xl sm:h-[124px] sm:w-[124px]"
                style={{
                  backgroundImage: "url('/frame1.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <img
                  src="/layer1.png"
                  alt="LTS logo"
                  className="absolute left-2 top-2 z-20 h-3.5 w-auto sm:h-4"
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-2 pt-14 text-center sm:pt-20">
                  <p className="text-[9px] uppercase tracking-wide text-[#FF9724] sm:text-[10px]">
                    The Tunes Of
                  </p>
                  <p className="text-base font-bold leading-none text-[#FF9724] sm:text-lg">
                    LEADERSHIP
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-start py-0">
                <p className="text-[10px] uppercase tracking-wide text-white/70 sm:text-[11px]">
                  Upcoming Album
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug text-white sm:text-base">
                  LTS 2026: The Tunes of
                </p>
                <p className="text-sm font-semibold leading-snug text-white sm:text-base">
                  Leadership
                </p>
                <p className="mt-1 text-xs text-white/80 sm:text-sm">AiCAL</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/listening-profile")}
            className="absolute bottom-3 left-3 z-10 rounded-full bg-[#1DB954] px-8 py-2 text-xs font-semibold text-black transition hover:bg-[#1ED760] sm:text-sm"
          >
            Pre-Save
          </button>
        </section>
      </div>
    </main>
  );
}
