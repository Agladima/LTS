"use client";

import React from "react";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import GreenDropdown from "@/app/components/GreenDropdown";
import { apiPost } from "@/app/lib/api";
import {
  readRegistrationDraft,
  writeRegistrationDraft,
  writeRegistrationResult,
} from "@/app/lib/registrationStorage";

type RegistrationCreateResponse = {
  registration_id?: string | number;
  email?: string;
};

const roleLabelMap: Record<string, string> = {
  tm: "Team Member - TM",
  tl: "Team Leader - TL",
  lcvp: "Local Committee Vice President - LCVP",
  lcp: "Local Committee President - LCP",
};

const departmentLabelMap: Record<string, string> = {
  "bd-ewa": "BD/EWA",
  fl: "F&L",
  icx: "iCX",
  mx: "MX",
  ogt: "oGT",
  ogv: "oGV",
  mkt: "MKT",
  eb: "EB",
};

const extractErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message;
  return "Failed to create registration. Please try again.";
};

export default function ListeningProfileSection3Page() {
  const router = useRouter();
  const savedDraft = React.useMemo(() => readRegistrationDraft(), []);
  const [studioOppositeSex, setStudioOppositeSex] = React.useState(
    savedDraft.studioOppositeSex ?? "",
  );
  const [socialHandle, setSocialHandle] = React.useState(
    savedDraft.socialHandle ?? "",
  );
  const [allergiesRemedy, setAllergiesRemedy] = React.useState(
    savedDraft.allergiesRemedy ?? "",
  );
  const [emergencyContact, setEmergencyContact] = React.useState(
    savedDraft.emergencyContact ?? "",
  );
  const [emergencyContactRelationship, setEmergencyContactRelationship] =
    React.useState(savedDraft.emergencyContactRelationship ?? "");
  const [suggestions, setSuggestions] = React.useState(
    savedDraft.suggestions ?? "",
  );
  const [marketingConsent, setMarketingConsent] = React.useState(
    savedDraft.marketingConsent ?? false,
  );
  const [showProfileCard, setShowProfileCard] = React.useState(false);
  const [profileCardBg, setProfileCardBg] = React.useState("#FFCDD2");
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [profilePreview, setProfilePreview] = React.useState({
    fullName: savedDraft.fullName ?? "Full Name",
    role: savedDraft.status ?? "Role",
    department: savedDraft.genre ?? "Functional Area",
  });

  const handleOpenProfileCard = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const draft = readRegistrationDraft();
    const mergedPayload = {
      ...draft,
      socialHandle,
      studioOppositeSex,
      allergiesRemedy,
      emergencyContact,
      emergencyContactRelationship,
      suggestions,
      marketingConsent,
    };

    // Keep existing client keys, and also send backend-friendly aliases.
    const createPayload = {
      ...mergedPayload,
      name: mergedPayload.fullName ?? "",
      full_name: mergedPayload.fullName ?? "",
      email: mergedPayload.email ?? "",
      phone: mergedPayload.phone ?? "",
      gender: mergedPayload.gender ?? "",
      dob: mergedPayload.dob ?? "",
      date_of_birth: mergedPayload.dob ?? "",
      user_type: mergedPayload.userType ?? "",
      status: mergedPayload.status ?? "",
      functional_area: mergedPayload.genre ?? "",
      first_listening_party: mergedPayload.firstParty ?? "",
      expectations: mergedPayload.expectations ?? "",
      social_media_handle: mergedPayload.socialHandle ?? "",
      stay_with_opposite_sex: mergedPayload.studioOppositeSex ?? "",
      allergies_remedy: mergedPayload.allergiesRemedy ?? "",
      emergency_contact: mergedPayload.emergencyContact ?? "",
      emergency_contact_relationship:
        mergedPayload.emergencyContactRelationship ?? "",
      suggestions: mergedPayload.suggestions ?? "",
      marketing_consent: mergedPayload.marketingConsent ?? false,
    };

    writeRegistrationDraft(mergedPayload);

    try {
      const response = await apiPost<RegistrationCreateResponse>(
        "/registration/create/",
        createPayload,
      );
      writeRegistrationResult(response);
    } catch (error) {
      console.error(error);
      alert(extractErrorMessage(error));
      setIsSubmitting(false);
      return;
    }

    const cardColors = ["#FFCDD2", "#8A38F5", "#FBE72E"];
    const randomColor =
      cardColors[Math.floor(Math.random() * cardColors.length)];
    setProfilePreview({
      fullName: mergedPayload.fullName ?? "Full Name",
      role: roleLabelMap[mergedPayload.status ?? ""] ?? "Role",
      department:
        departmentLabelMap[mergedPayload.genre ?? ""] ?? "Functional Area",
    });
    setProfileCardBg(randomColor);
    setShowProfileCard(true);
    setIsSubmitting(false);
  };

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });

  const drawWrappedText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ) => {
    const words = text.split(" ");
    let line = "";
    let lineY = y;

    for (let i = 0; i < words.length; i += 1) {
      const testLine = `${line}${words[i]} `;
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line.trim(), x, lineY);
        line = `${words[i]} `;
        lineY += lineHeight;
      } else {
        line = testLine;
      }
    }

    ctx.fillText(line.trim(), x, lineY);
    return lineY;
  };

  const handleDownloadCard = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const width = 990;
      const height = 1560;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Unable to initialize canvas context.");

      ctx.fillStyle = profileCardBg;
      ctx.fillRect(0, 0, width, height);

      const cardPadding = 42;
      let logoImg: HTMLImageElement;
      try {
        logoImg = await loadImage("/vector1.png");
      } catch {
        logoImg = await loadImage("/layer1.png");
      }
      const mainImg = await loadImage("/frame5.png");

      // Header
      ctx.drawImage(logoImg, cardPadding, 48, 52, 52);
      ctx.fillStyle = "#000000";
      ctx.font = "700 34px Arial";
      ctx.fillText("LTS Calabar", cardPadding + 66, 84);
      ctx.font = "400 24px Arial";
      ctx.fillText("LTSCALABAR/2026", width - 270, 84);

      // Body text
      ctx.font = "700 52px Arial";
      ctx.fillText("That's all for now.", cardPadding, 180);
      ctx.font = "500 30px Arial";
      const paragraph =
        'You\'ve created your profile for the "Leadership" listening party on "Free trial" upgrade to "Premium" for unlimited access';
      const textEndY = drawWrappedText(
        ctx,
        paragraph,
        cardPadding,
        236,
        width - cardPadding * 2,
        42,
      );

      // Main image
      const imageTop = textEndY + 34;
      const imageHeight = 380;
      ctx.drawImage(
        mainImg,
        cardPadding,
        imageTop,
        width - cardPadding * 2,
        imageHeight,
      );

      // Details
      const detailsY = imageTop + imageHeight + 56;
      ctx.font = "700 28px Arial";
      ctx.fillText("Listener's Name:", cardPadding, detailsY);
      ctx.fillText("Role:", cardPadding, detailsY + 48);
      ctx.fillText("Department:", cardPadding, detailsY + 96);
      ctx.font = "400 28px Arial";
      ctx.fillText("[Full Name]", cardPadding + 270, detailsY);
      ctx.fillText("[Role]", cardPadding + 270, detailsY + 48);
      ctx.fillText("[Functional Area]", cardPadding + 270, detailsY + 96);

      // Free trial button
      const buttonY = detailsY + 158;
      const buttonWidth = 430;
      const buttonHeight = 66;
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.roundRect(cardPadding, buttonY, buttonWidth, buttonHeight, 33);
      ctx.fill();

      ctx.fillStyle = profileCardBg;
      ctx.font = "700 30px Arial";
      ctx.fillText("FREE TRIAL", cardPadding + 120, buttonY + 43);

      ctx.fillStyle = "#000000";
      ctx.font = "400 25px Arial";
      ctx.fillText(
        "Pay confirmation fee to upgrade",
        cardPadding,
        buttonY + 112,
      );
      ctx.fillText("to premium", cardPadding, buttonY + 146);

      const downloadLink = document.createElement("a");
      downloadLink.href = canvas.toDataURL("image/png");
      downloadLink.download = "lts-profile-card.png";
      downloadLink.click();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  React.useEffect(() => {
    if (showProfileCard) {
      document.body.classList.add("profile-modal-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("profile-modal-open");
      document.body.style.overflow = "";
    }

    return () => {
      document.body.classList.remove("profile-modal-open");
      document.body.style.overflow = "";
    };
  }, [showProfileCard]);

  React.useEffect(() => {
    writeRegistrationDraft({
      socialHandle,
      studioOppositeSex,
      allergiesRemedy,
      emergencyContact,
      emergencyContactRelationship,
      suggestions,
      marketingConsent,
    });
  }, [
    socialHandle,
    studioOppositeSex,
    allergiesRemedy,
    emergencyContact,
    emergencyContactRelationship,
    suggestions,
    marketingConsent,
  ]);

  return (
    <main className="min-h-screen bg-black px-3 py-5 text-white sm:px-6 sm:py-10">
      <div
        className="mx-auto w-full max-w-[450px] min-h-[calc(100dvh-9.5rem)] rounded-xl p-3.5 transition duration-300 sm:min-h-[calc(100dvh-10.5rem)] sm:rounded-2xl sm:p-5"
        style={{ background: "#000000" }}
      >
        <div className="sticky top-0 z-30 mb-4 flex items-center justify-center bg-black py-1">
          <button
            type="button"
            onClick={() => router.push("/listening-profile/section-2")}
            className="absolute left-0 z-30 rounded-full bg-black p-0.5 text-white"
            aria-label="Go back to previous form section"
          >
            <IoMdArrowBack className="h-6 w-6" />
          </button>

          <h1 className="text-center text-base font-semibold leading-tight sm:text-xl">
            Creating Listening Profile
          </h1>
        </div>

        <form
          className={`mt-8 space-y-4 transition duration-300 ${
            showProfileCard ? "pointer-events-none blur-sm" : ""
          }`}
        >
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
              value={socialHandle}
              onChange={(event) => setSocialHandle(event.target.value)}
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
              Would you like a studio with opposite sex?
            </label>
            <GreenDropdown
              id="studioOppositeSex"
              name="studioOppositeSex"
              value={studioOppositeSex}
              placeholder="Select an option"
              onChange={setStudioOppositeSex}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
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
              value={allergiesRemedy}
              onChange={(event) => setAllergiesRemedy(event.target.value)}
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
              value={emergencyContact}
              onChange={(event) => setEmergencyContact(event.target.value)}
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
              value={emergencyContactRelationship}
              onChange={(event) =>
                setEmergencyContactRelationship(event.target.value)
              }
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
              Got any suggestions
            </label>
            <input
              id="suggestions"
              name="suggestions"
              type="text"
              placeholder="Type and answer"
              value={suggestions}
              onChange={(event) => setSuggestions(event.target.value)}
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
                Share my registration data with LTS Calabar content providers
                for marketing purposes.
              </p>
              <label className="mt-0.5 flex items-center">
                <span className="relative h-5 w-5 rounded-full border-2 border-[#777777] p-[2px]">
                  <input
                    type="radio"
                    name="marketingConsent"
                    value="yes"
                    checked={marketingConsent}
                    onChange={() => setMarketingConsent(true)}
                    className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0"
                  />
                  <span className="pointer-events-none block h-full w-full rounded-full border border-black bg-black peer-checked:bg-[#777777]" />
                </span>
              </label>
            </div>

            <p className="mt-4 text-xs leading-snug text-white/75">
              By tapping on “Create Profile”, you agree to the LTS Calabar Terms
              of Use.
            </p>
            <p className="mt-3 text-xs leading-snug text-white/75">
              To learn more about how LTS Calabar collect, uses, shares and
              protects your personal data, Please see the LTS Privacy Policy.
            </p>

            <button
              type="button"
              onClick={handleOpenProfileCard}
              className="mx-auto mt-5 block w-[60%] rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-white/90"
            >
              {isSubmitting ? "Creating..." : "Create Profile"}
            </button>
          </div>
        </form>
      </div>

      {showProfileCard && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setShowProfileCard(false)}
        >
          <div
            className="w-full max-w-[330px] space-y-3"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="p-3.5 text-black sm:p-4"
              style={{ backgroundColor: profileCardBg }}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/vector1.png"
                    alt="LTS logo"
                    width={26}
                    height={26}
                    className="h-6 w-6 object-contain"
                  />
                  <p className="text-sm font-bold">LTS Calabar</p>
                </div>
                <p className="text-xs text-black/80">LTSCALABAR/2026</p>
              </div>

              <p className="text-lg font-semibold">That&apos;s all for now.</p>
              <p className="mt-1 text-sm leading-relaxed text-black/90">
                You&apos;ve created your profile for the{" "}
                <span className="font-bold">&quot;Leadership&quot;</span>{" "}
                listening party on{" "}
                <span className="font-bold">&quot;Free trial&quot;</span>{" "}
                upgrade to{" "}
                <span className="font-bold">&quot;Premium&quot;</span> for
                unlimited access
              </p>

              <div className="mt-4 h-32 w-full overflow-hidden">
                <Image
                  src="/frame5.png"
                  alt="Profile preview placeholder"
                  width={700}
                  height={420}
                  className="h-full w-full object-contain object-center"
                />
              </div>

              <div className="mt-4 space-y-1 text-sm text-black/90">
                <p>
                  <span className="inline-block w-28 font-bold">
                    Listener&apos;s Name:
                  </span>
                  <span className="font-normal">[{profilePreview.fullName}]</span>
                </p>
                <p>
                  <span className="inline-block w-28 font-bold">Role:</span>
                  <span className="font-normal">[{profilePreview.role}]</span>
                </p>
                <p>
                  <span className="inline-block w-28 font-bold">
                    Department:
                  </span>
                  <span className="font-normal">
                    [{profilePreview.department}]
                  </span>
                </p>
              </div>

              <div className="mt-5 inline-block">
                <button
                  type="button"
                  className="w-full rounded-full bg-black px-8 py-2 text-sm font-bold"
                  style={{ color: profileCardBg }}
                >
                  FREE TRIAL
                </button>
                <p className="mt-3 w-max text-xs text-black/80">
                  Pay <span className="font-bold">confirmation fee</span> to
                  upgrade
                  <br />
                  to <span className="font-bold">premium</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadCard}
              className="w-full rounded-full bg-[#1DB954] px-5 py-2.5 text-sm font-semibold text-black"
            >
              {isDownloading ? "Downloading..." : "Download"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/upgrade-premium")}
              className="w-full rounded-full bg-[#DADADA] px-5 py-2.5 text-sm font-semibold text-black"
            >
              Upgrade to premium
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
