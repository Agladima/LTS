"use client";

import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import GreenDropdown from "@/app/components/GreenDropdown";
import { apiPost } from "@/app/lib/api";

export default function UpgradeToPremiumPage() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [userType, setUserType] = React.useState("");
  const [premiumPlan, setPremiumPlan] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const planPriceByValue: Record<string, string> = {
    virtual_plan: "N15,000",
    day_pass_plan: "N18,000",
    full_hotel_stay: "N20,000",
  };

  const planLabelByValue: Record<string, string> = {
    virtual_plan: "Virtual Plan",
    day_pass_plan: "Day Pass Plan",
    full_hotel_stay: "Full Hotel Stay",
  };

  const userLabelByValue: Record<string, string> = {
    new_member: "New Member",
    old_member: "Old Member",
    alumnus: "Alumnus",
  };

  const handleGoToPaymentPage = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const requestPayload = {
      email,
      phone,
      name: fullName,
      status: userLabelByValue[userType] || userType,
      selected_plan: planLabelByValue[premiumPlan] || premiumPlan,
    };

    apiPost<{ amount?: string | number; charge?: string | number }>(
      "/registration/upgrade/",
      requestPayload,
    )
      .then((response) => {
        const amountFromApi = response.amount ?? response.charge;
        const resolvedAmount =
          amountFromApi === undefined || amountFromApi === null
            ? planPriceByValue[premiumPlan] || "N20,000"
            : String(amountFromApi);

        const query = new URLSearchParams({
          fullName: fullName || "Full Name",
          email: email || "Email address",
          phone: phone || "Phone",
          userType: userLabelByValue[userType] || "Membership status",
          premiumPlan: planLabelByValue[premiumPlan] || "Premium plan name",
          price: resolvedAmount,
        });
        router.push(`/upgrade-premium/payment?${query.toString()}`);
      })
      .catch((error) => {
        console.error(error);
        alert("Upgrade failed. Please check your details and try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <main className="min-h-screen bg-black px-3 py-5 text-white sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-[450px] min-h-[calc(100dvh-9.5rem)] rounded-xl p-3.5 sm:min-h-[calc(100dvh-10.5rem)] sm:rounded-2xl sm:p-5">
        <div className="relative mb-4 flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.push("/listening-profile/section-3")}
            className="absolute left-0 rounded-full bg-black p-0.5 text-white"
            aria-label="Go back to previous page"
          >
            <IoMdArrowBack className="h-6 w-6" />
          </button>

          <h1 className="text-center text-base font-semibold leading-tight sm:text-xl">
            Upgrade to Premium
          </h1>
        </div>

        <form className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              What should we call you?
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="w-full rounded-md border border-white/30 bg-white/10 px-4 py-4 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Please enter your full name
            </p>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              What&apos;s your email?
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-white/30 bg-white/10 px-4 py-4 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Please enter a valid email adress
            </p>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              What&apos;s your phone number?
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-md border border-white/30 bg-white/10 px-4 py-4 text-base text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Please enter your WhatsApp number
            </p>
          </div>

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
                { value: "new_member", label: "New Member" },
                { value: "old_member", label: "Old Member" },
                { value: "alumnus", label: "Alumnus" },
              ]}
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Are you an old or new member
            </p>
          </div>

          <div>
            <label
              htmlFor="premiumPlan"
              className="mb-1 block text-xl font-semibold text-white/90"
            >
              Select a Premium plan
            </label>
            <GreenDropdown
              id="premiumPlan"
              name="premiumPlan"
              value={premiumPlan}
              placeholder="Select an option"
              onChange={setPremiumPlan}
              options={[
                { value: "virtual_plan", label: "Virtual Plan(15,000 NGN)" },
                { value: "day_pass_plan", label: "Day Pass Plan(18,000 NGN)" },
                {
                  value: "full_hotel_stay",
                  label: "Full Hotel Stay (20,000 NGN)",
                },
              ]}
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Choose your preferred attendance
            </p>
          </div>
        </form>

        <div className="pt-4">
          <div className="h-px w-full bg-white/30" />

          <p className="mt-4 text-xs leading-snug text-white/75">
            By tapping on “Upgrade to Premium”, you agree to the LTS Calabar
            Terms of Use.
          </p>

          <p className="mt-3 text-xs leading-snug text-white/75">
            To learn more about how LTS Calabar collect, uses, shares and
            protects your personal data, Please see the LTS Privacy Policy.
          </p>

          <div className="mt-3 flex items-start justify-between gap-3">
            <p className="text-xs leading-snug text-white/85">
              Share my registration data with LTS Calabar content providers for
              marketing purposes.
            </p>
            <label className="mt-0.5 flex items-center">
              <span className="relative h-5 w-5 rounded-full border-2 border-[#777777] p-[2px]">
                <input
                  type="radio"
                  name="marketingConsentUpgrade"
                  value="yes"
                  className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0"
                />
                <span className="pointer-events-none block h-full w-full rounded-full border border-black bg-black peer-checked:bg-[#777777]" />
              </span>
            </label>
          </div>

          <button
            type="button"
            onClick={handleGoToPaymentPage}
            className="mx-auto mt-5 block w-[60%] rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-white/90"
          >
            {isSubmitting ? "Processing..." : "Upgrade to Premium"}
          </button>
        </div>
      </div>
    </main>
  );
}
