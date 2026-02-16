"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
};

export default function WelcomePage() {
  const greeting = getGreeting();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const artistsScrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  const handleArtistsWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!artistsScrollRef.current) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    event.preventDefault();
    artistsScrollRef.current.scrollLeft += event.deltaY;
  };

  const handleArtistsMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!artistsScrollRef.current) return;
    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    startScrollLeftRef.current = artistsScrollRef.current.scrollLeft;
  };

  const handleArtistsMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!artistsScrollRef.current || !isDraggingRef.current) return;
    const deltaX = event.clientX - dragStartXRef.current;
    artistsScrollRef.current.scrollLeft = startScrollLeftRef.current - deltaX;
  };

  const handleArtistsMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const goToListeningProfile = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    setTimeout(() => {
      router.push("/listening-profile");
    }, 220);
  };

  const popularArtists = [
    {
      id: 1,
      src: "/lts23.jpg",
      name: "Betiang Chris-Eugene",
      title: "LCP 26.27",
    },
    {
      id: 2,
      src: "/bee.jpeg",
      name: "Favour Bassey",
      title: "LCP 25.26",
    },
    {
      id: 3,
      src: "/okod.jpeg",
      name: "Okod-Asi Kadimo",
      title: "LCVP MX 25.26",
    },
    {
      id: 4,
      src: "/ekp.jpeg",
      name: "Ekpenyong-Awan Bassey",
      title: "LCVP ICX 26.27",
    },
    {
      id: 5,
      src: "/eun.jpeg",
      name: "Eunice Solomon",
      title: "Team Leader, MX 26.27",
    },
    {
      id: 6,
      src: "/pasc.jpeg",
      name: "Paschal Betiang",
      title: "Team Leader, MKT 26.27 ",
    },
  ];

  return (
    <main
      className={`min-h-screen bg-black px-4 py-8 text-white transition-opacity duration-200 sm:px-6 sm:py-12 ${
        isNavigating ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="mx-auto w-full max-w-[450px]">
        <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
          {greeting}
        </h1>
        <h2 className="mt-6 text-lg font-medium text-white/90 sm:text-xl">
          Upcoming releases
        </h2>

        <section className="mt-4 rounded-2xl bg-[#121212] p-2.5 sm:p-3">
          <div className="flex items-start gap-2 sm:gap-3">
            <div
              className="relative w-[40%] min-w-[105px] overflow-hidden rounded-xl sm:min-w-[120px]"
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
                className="absolute left-2 top-2 z-20 h-6 w-auto sm:h-7"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-2 pt-14 text-center sm:pt-20">
                <p className="text-[9px] uppercase tracking-wide text-[#FF9724] sm:text-[10px]">
                  The Tunes Of
                </p>
                <p className="text-base font-bold leading-none text-[#FF9724] sm:text-lg">
                  LEADERSHIP
                </p>
              </div>
              <div className="pb-[110%]" />
            </div>

            <div className="flex w-[60%] flex-col justify-start py-0">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-white/70 sm:text-[11px]">
                  upcoming event
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug text-white sm:text-base">
                  LTS 2026: The Tunes of
                </p>
                <p className="text-sm font-semibold leading-snug text-white sm:text-base">
                  Leadership (Listening Party)
                </p>
                <p className="mt-1 text-xs text-white/80 sm:text-sm">
                  AiCAL 26.27
                </p>
              </div>

              <button
                type="button"
                onClick={goToListeningProfile}
                className="mt-4 rounded-full bg-[#1DB954] px-4 py-2 text-xs font-semibold text-black transition hover:bg-[#1ED760] sm:mt-6 sm:text-sm"
              >
                Join Listening Party
              </button>
            </div>
          </div>
        </section>

        <section className="mt-5 flex items-center gap-3 rounded-2xl p-2.5 sm:p-3">
          <img
            src="/frame2.png"
            alt="Leadership 101 cover"
            className="h-16 w-16 rounded-lg object-cover sm:h-20 sm:w-20"
          />
          <div>
            <p className="text-[10px] font-light tracking-wide text-white/55">
              #LTSCALABAR
            </p>
            <p className="mt-1 text-lg font-bold leading-tight text-white sm:text-xl">
              Leadership 101
            </p>
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-base font-semibold text-white sm:text-lg">
            Jump back in
          </h3>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div>
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/lts23.jpg"
                  alt="Pictures from LTS 2023"
                  className="aspect-square w-full object-cover"
                />
                <img
                  src="/layer1.png"
                  alt="LTS logo"
                  className="absolute left-1.5 top-1.5 z-20 h-5 w-auto"
                />
                <p className="absolute left-0 bottom-2 z-20 bg-[#8A38F5] px-2 py-0.5 text-[10px] font-semibold text-white">
                  LTS 2023
                </p>
              </div>
              <p className="mt-1 text-[10px] leading-snug text-white/85">
                Pictures from LTS 2023
              </p>
            </div>

            <div>
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/lts24.JPG"
                  alt="Pictures from LTS 2024"
                  className="aspect-square w-full object-cover"
                />
                <img
                  src="/layer1.png"
                  alt="LTS logo"
                  className="absolute left-1.5 top-1.5 z-20 h-5 w-auto"
                />
                <p className="absolute left-0 bottom-2 z-20 bg-[#022C35] px-2 py-0.5 text-[10px] font-semibold text-white">
                  LTS 2024
                </p>
              </div>
              <p className="mt-1 text-[10px] leading-snug text-white/85">
                Pictures from LTS 2024
              </p>
            </div>

            <div>
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/lts25.jpg"
                  alt="Pictures from LTS 2025"
                  className="aspect-square w-full object-cover"
                />
                <img
                  src="/layer1.png"
                  alt="LTS logo"
                  className="absolute left-1.5 top-1.5 z-20 h-5 w-auto"
                />
                <p className="absolute left-0 bottom-2 z-20 bg-[#037EF3] px-2 py-0.5 text-[10px] font-semibold text-white">
                  LTS 2025
                </p>
              </div>
              <p className="mt-1 text-[10px] leading-snug text-white/85">
                Pictures from LTS 2025
              </p>
            </div>
          </div>
        </section>

        <section className="mt-7">
          <h3 className="text-base font-semibold text-white sm:text-lg">
            Made for you
          </h3>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <div
                className="flex aspect-square cursor-pointer items-center justify-center rounded-lg"
                style={{
                  background:
                    "linear-gradient(to bottom right, #0FDD6E 0%, #F6FF54 100%)",
                }}
                onClick={goToListeningProfile}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    goToListeningProfile();
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <span className="text-3xl font-semibold leading-none text-white sm:text-4xl">
                  +
                </span>
              </div>
              <p className="mt-2 text-xs leading-snug text-white sm:text-sm">
                Add your own songs to the
              </p>
              <p className="text-xs leading-snug text-white sm:text-sm">
                Leadership Playlist
              </p>
            </div>

            <div>
              <img
                src="/frame3.jpg"
                alt="Playlist cover"
                className="aspect-square w-full rounded-lg object-cover"
              />
              <p className="mt-2 text-xs font-bold text-white sm:text-sm">
                Playlist
              </p>
              <p className="text-xs font-normal text-white/85 sm:text-sm">
                AIESEC Roll Calls
              </p>
            </div>
          </div>
        </section>

        <section className="mt-7 w-full rounded-2xl bg-[#1DB954] px-4 py-6 text-center">
          <p className="text-base font-semibold leading-snug text-black sm:text-lg">
            If <span className="font-bold">&quot;LEADERSHIP&quot;</span> was a
            Playlist,
          </p>
          <p className="text-base font-semibold leading-snug text-black sm:text-lg">
            what type of songs will be in it?
          </p>

          <button
            type="button"
            onClick={goToListeningProfile}
            className="mx-auto mt-4 block rounded-full bg-black px-6 py-2 text-sm font-semibold text-white"
          >
            Creat your listernes profile
          </button>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Popular Artist
          </h2>
          <p className="mt-1 text-xs font-normal text-white/80 sm:text-sm">
            AIESECers you know
          </p>

          <div
            ref={artistsScrollRef}
            onWheel={handleArtistsWheel}
            onMouseDown={handleArtistsMouseDown}
            onMouseMove={handleArtistsMouseMove}
            onMouseUp={handleArtistsMouseUpOrLeave}
            onMouseLeave={handleArtistsMouseUpOrLeave}
            className="mt-4 cursor-grab touch-pan-x overflow-x-auto pb-1 select-none active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex gap-3 pr-2">
              {popularArtists.map((artist) => (
                <div
                  key={artist.id}
                  className="w-[calc((100%-1.5rem)/3)] min-w-[calc((100%-1.5rem)/3)] flex-none"
                >
                  <img
                    src={artist.src}
                    alt={`Artist placeholder ${artist.id}`}
                    className="aspect-square w-full rounded-full object-cover"
                  />
                  <p className="mt-2 text-center text-xs font-bold leading-tight text-white sm:text-sm">
                    {artist.name}
                  </p>
                  <p className="text-center text-[11px] leading-tight text-white/75 sm:text-xs">
                    {artist.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative mt-8 h-[390px] w-full overflow-hidden rounded-2xl p-2.5 sm:h-[430px] sm:p-3"
          style={{
            backgroundImage: "url('/frame4.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 rounded-2xl bg-[#47464B] p-2 sm:p-2.5">
            <div className="flex items-start gap-2 sm:gap-3">
              <div
                className="relative w-[40%] min-w-[105px] overflow-hidden rounded-xl sm:min-w-[120px]"
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
                  className="absolute left-2 top-2 z-20 h-6 w-auto sm:h-7"
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-2 pt-14 text-center sm:pt-20">
                  <p className="text-[9px] uppercase tracking-wide text-[#FF9724] sm:text-[10px]">
                    The Tunes Of
                  </p>
                  <p className="text-base font-bold leading-none text-[#FF9724] sm:text-lg">
                    LEADERSHIP
                  </p>
                </div>
                <div className="pb-[80%]" />
              </div>

              <div className="flex w-[60%] flex-col justify-start py-0">
                <p className="text-[10px] uppercase tracking-wide text-white/70 sm:text-[11px]">
                  upcoming event
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug text-white sm:text-base">
                  LTS 2026: The Tines of
                </p>
                <p className="text-sm font-semibold leading-snug text-white sm:text-base">
                  Leadership (Listening Party)
                </p>
                <p className="mt-1 text-xs text-white/80 sm:text-sm">
                  AiCAL 26.27
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={goToListeningProfile}
            className="absolute bottom-3 left-3 z-10 rounded-full bg-[#1DB954] px-8 py-2 text-xs font-semibold text-black transition hover:bg-[#1ED760] sm:text-sm"
          >
            Pre-Save
          </button>
        </section>
      </div>
    </main>
  );
}
