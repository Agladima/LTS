"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LTS = () => {
  const [isSecondScreen, setIsSecondScreen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleFirstInteraction = () => {
    if (!isSecondScreen) {
      setIsSecondScreen(true);
    }
  };

  const goToWelcome = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    setTimeout(() => {
      router.push("/welcome");
    }, 220);
  };

  return (
    <div
      className={`min-h-[100dvh] bg-black flex items-center justify-center p-4 transition-opacity duration-200 ${
        isNavigating ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Card */}
      <div
        className="
          relative
          w-full max-w-[450px] h-[96dvh] max-h-[760px]
          bg-black
          rounded-2xl
          overflow-hidden
        "
        style={{
          backgroundImage: "url('/Start.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={handleFirstInteraction}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            handleFirstInteraction();
          }
        }}
        role="button"
        tabIndex={0}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text Content */}
        <div className="absolute left-1/2 bottom-24 sm:bottom-[20%] z-10 w-full -translate-x-1/2 px-6">
          <div className="relative mx-auto w-full max-w-[360px] text-left">
            <div
              className={`transition-all duration-500 ease-out ${
                isSecondScreen
                  ? "opacity-0 translate-y-10 pointer-events-none"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <p className="text-white text-2xl sm:text-3xl leading-snug text-left">
                If{" "}
                <span className="text-green-500 font-semibold">
                  "Leadership"
                </span>{" "}
                was a <br />
                playlist what would it <br />
                sound like?
              </p>
            </div>

            <div
              className={`absolute left-0 top-0 w-full transition-all duration-500 ease-out ${
                isSecondScreen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10 pointer-events-none"
              }`}
            >
              <p className="text-white text-2xl sm:text-3xl leading-snug text-left">
                Welcome to{" "}
                <span className="text-green-500 font-semibold whitespace-nowrap">
                  LTS 2026:
                </span>
                <br />
                The Frequency
              </p>
              <button
                type="button"
                onClick={goToWelcome}
                className="mt-6 mx-auto block w-[80%] rounded-full bg-[#1DB954] px-7 py-2 text-sm font-semibold text-black transition hover:bg-[#1ED760]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
        <p
          className={`absolute left-1/2 bottom-6 z-10 w-full -translate-x-1/2 px-6 text-center text-xs text-white/85 transition-all duration-500 ${
            isSecondScreen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6 pointer-events-none"
          }`}
        >
          Already registered? Want to upgrade to premium
          <br />
          <span className="text-[#1DB954]">Click here</span>
        </p>
      </div>
    </div>
  );
};

export default LTS;
