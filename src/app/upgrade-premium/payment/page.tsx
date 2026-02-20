"use client";

import Image from "next/image";
import React from "react";
import { BsBank } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { RxPerson } from "react-icons/rx";
import { useRouter, useSearchParams } from "next/navigation";

function UpgradePremiumPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedMethod, setSelectedMethod] = React.useState("");

  const fullName = searchParams.get("fullName") ?? "Full Name";
  const email = searchParams.get("email") ?? "Email address";
  const userType = searchParams.get("userType") ?? "Membership status";
  const premiumPlan = searchParams.get("premiumPlan") ?? "Premium plan name";
  const price = searchParams.get("price") ?? "N20,000";

  return (
    <main className="min-h-screen bg-black px-3 py-5 text-white sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-[450px] min-h-[calc(100dvh-9.5rem)] rounded-xl p-3.5 sm:min-h-[calc(100dvh-10.5rem)] sm:rounded-2xl sm:p-5">
        <div className="relative mb-5 flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.push("/upgrade-premium")}
            className="absolute left-0 rounded-full bg-black p-0.5 text-white"
            aria-label="Go back to premium form page"
          >
            <IoMdArrowBack className="h-6 w-6" />
          </button>
          <h1 className="text-center text-base font-semibold leading-tight sm:text-xl">
            Upgrade to Premium
          </h1>
        </div>

        <div className="mx-auto w-full max-w-[340px] rounded-md border border-white/30 bg-white/10 px-4 py-4 text-white backdrop-blur-md">
          <div className="mb-3">
            <div className="flex items-start gap-2">
              <Image
                src="/layer1.png"
                alt="LTS logo"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
              <p className="text-sm font-bold">LTS Calabar</p>
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold">
              <RxPerson className="h-4 w-4" aria-hidden="true" />
              <span>Listener&apos;s Information</span>
            </p>
          </div>

          <div className="space-y-1 text-sm">
            <p className="flex items-center justify-between gap-3">
              <span className="font-semibold">Listeners Name:</span>
              <span>[{fullName}]</span>
            </p>
            <p className="flex items-center justify-between gap-3">
              <span className="font-semibold">Email:</span>
              <span>[{email}]</span>
            </p>
            <p className="flex items-center justify-between gap-3">
              <span className="font-semibold">User:</span>
              <span>[{userType}]</span>
            </p>
          </div>

          <div className="my-3 h-px w-full bg-white/30" />

          <div className="space-y-1 text-sm">
            <p className="flex items-center justify-between gap-3">
              <span className="font-semibold">Premium plan:</span>
              <span>[{premiumPlan}]</span>
            </p>
            <p className="flex items-center justify-between gap-3">
              <span className="font-semibold">Price:</span>
              <span>[{price}]</span>
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="mx-auto w-full max-w-[340px] text-sm font-semibold text-white">
            Choose Payment Method
          </p>

          <div className="mx-auto mt-2 w-full max-w-[340px] rounded-md border border-white/30 bg-white/10 p-3 backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-1.5 text-sm text-white">
                  <BsBank className="h-4 w-4" aria-hidden="true" />
                  <span>Bank Transfer</span>
                </p>
              </div>
              <label className="mt-0.5 flex items-center">
                <span className="relative h-5 w-5 rounded-full border-2 border-[#1DB954] p-[2px]">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={selectedMethod === "bank_transfer"}
                    onChange={() => setSelectedMethod("bank_transfer")}
                    className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0"
                  />
                  <span className="pointer-events-none block h-full w-full rounded-full border border-black bg-black peer-checked:bg-[#1DB954]" />
                </span>
              </label>
            </div>
          </div>
          <p className="mx-auto mt-1 w-full max-w-[340px] text-xs text-white/75">
            You will be transferred to WhatsApp to get the account details
          </p>

          <button
            type="button"
            onClick={() => window.open("https://wa.link/2dy5ud", "_blank", "noopener,noreferrer")}
            className="mx-auto mt-5 block w-[52%] rounded-full bg-[#1DB954] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#1ED760]"
          >
            Pay now
          </button>
        </div>
      </div>
    </main>
  );
}

export default function UpgradePremiumPaymentPage() {
  return (
    <React.Suspense fallback={null}>
      <UpgradePremiumPaymentContent />
    </React.Suspense>
  );
}
