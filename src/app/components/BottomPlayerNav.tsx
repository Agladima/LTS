"use client";

import React from "react";
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
import { IoPlay } from "react-icons/io5";
import { IoMdBluetooth } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";

export default function BottomPlayerNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const isWelcomePage = pathname === "/welcome";
  const isUpgradePremiumPage = pathname.startsWith("/upgrade-premium");
  const isListeningProfilePage = pathname === "/listening-profile";
  const isListeningProfileStep2Page =
    pathname === "/listening-profile/section-2";
  const isListeningProfileStep3Page =
    pathname === "/listening-profile/section-3";
  const progressWidth =
    pathname === "/welcome"
      ? "8%"
      : pathname === "/listening-profile"
        ? "38%"
        : pathname === "/listening-profile/section-2"
          ? "72%"
          : pathname === "/listening-profile/section-3"
            ? "100%"
            : "45%";

  const handlePrimaryAction = () => {
    if (isListeningProfilePage) {
      router.push("/listening-profile/section-2");
      return;
    }
    if (isListeningProfileStep2Page) {
      router.push("/listening-profile/section-3");
      return;
    }
    if (isListeningProfileStep3Page) {
      return;
    }
    router.push("/listening-profile");
  };

  const handlePreviousAction = () => {
    if (isListeningProfileStep3Page) {
      router.push("/listening-profile/section-2");
      return;
    }
    if (isListeningProfileStep2Page) {
      router.push("/listening-profile");
      return;
    }
    if (isListeningProfilePage) {
      router.push("/welcome");
      return;
    }
    router.back();
  };

  React.useEffect(() => {
    const updateFromBody = () => {
      setIsProfileModalOpen(
        document.body.classList.contains("profile-modal-open"),
      );
    };

    updateFromBody();
    const observer = new MutationObserver(updateFromBody);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Keep landing screen clean; show on all subsequent pages.
  if (pathname === "/") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-black/95 px-4 pb-5 pt-3 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-[450px]">
        {!isProfileModalOpen && !isUpgradePremiumPage ? (
          <div className="mb-3 rounded-xl bg-[#121212] px-3 py-2">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-white"
                  aria-hidden="true"
                >
                  <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.32 0-6 2.24-6 5v1h12v-1c0-2.76-2.68-5-6-5Z" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] text-white">
                  <span className="font-bold">
                    Create Listener&apos;s Profile .{" "}
                  </span>
                  <span className="font-normal">AiCAL</span>
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#1DB954]">
                  <IoMdBluetooth className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>LTSCalabar</span>
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                {isListeningProfileStep2Page || isListeningProfileStep3Page ? (
                  <button
                    type="button"
                    onClick={handlePreviousAction}
                    className="rounded-full p-1.5 text-white/90 transition hover:bg-white/10"
                    aria-label="Go to previous page"
                  >
                    <GiPreviousButton className="h-5 w-5" aria-hidden="true" />
                  </button>
                ) : null}

                {!isListeningProfileStep3Page ? (
                  <button
                    type="button"
                    onClick={handlePrimaryAction}
                    className={`rounded-full p-1.5 transition ${
                      isWelcomePage
                        ? "bg-[#1DB954] text-black hover:bg-[#1ED760]"
                        : "text-white/90 hover:bg-white/10"
                    }`}
                    aria-label="Go to listening profile form"
                  >
                    {isWelcomePage ? (
                      <IoPlay className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <GiNextButton className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                ) : null}
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#1DB954]">
              <div
                className="h-1.5 rounded-full bg-white transition-all duration-500 ease-out"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        ) : null}

        <nav className="grid grid-cols-3 items-center text-white/85">
          <button
            type="button"
            onClick={() => router.push("/welcome")}
            className="flex flex-col items-center gap-1"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-current"
              aria-hidden="true"
            >
              <path d="M12 3.4 3 10v10h6v-6h6v6h6V10l-9-6.6Z" />
            </svg>
            <span className="text-[11px]">Home</span>
          </button>

          <button type="button" className="flex flex-col items-center gap-1">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-current"
              aria-hidden="true"
            >
              <path d="M4 18h3V10H4v8Zm6 0h3V6h-3v12Zm6 0h3V13h-3v5Z" />
            </svg>
            <span className="text-[11px]">Statistics</span>
          </button>

          <button
            type="button"
            onClick={() => router.push("/settings")}
            className="flex flex-col items-center gap-1"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-current"
              aria-hidden="true"
            >
              <path d="m19.14 12.94.02-.94-.02-.94 2.03-1.58a.6.6 0 0 0 .14-.77l-1.92-3.32a.6.6 0 0 0-.73-.27l-2.39.96a7.5 7.5 0 0 0-1.63-.94l-.36-2.53A.59.59 0 0 0 13.69 2h-3.38a.59.59 0 0 0-.59.5l-.36 2.53c-.58.23-1.13.55-1.63.94l-2.39-.96a.6.6 0 0 0-.73.27L2.69 8.6a.6.6 0 0 0 .14.77l2.03 1.58-.02.94.02.94-2.03 1.58a.6.6 0 0 0-.14.77l1.92 3.32c.15.26.46.37.73.27l2.39-.96c.5.39 1.05.71 1.63.94l.36 2.53c.05.29.3.5.59.5h3.38c.29 0 .54-.21.59-.5l.36-2.53c.58-.23 1.13-.55 1.63-.94l2.39.96c.27.1.58-.01.73-.27l1.92-3.32a.6.6 0 0 0-.14-.77l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z" />
            </svg>
            <span className="text-[11px]">Settings</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
