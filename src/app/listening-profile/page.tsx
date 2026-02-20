"use client";

import React, { useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import GreenDropdown from "@/app/components/GreenDropdown";
import {
  readRegistrationDraft,
  writeRegistrationDraft,
} from "@/app/lib/registrationStorage";

export default function ListeningProfilePage() {
  const router = useRouter();
  const savedDraft = React.useMemo(() => readRegistrationDraft(), []);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState(savedDraft.fullName ?? "");
  const [email, setEmail] = useState(savedDraft.email ?? "");
  const [phone, setPhone] = useState(savedDraft.phone ?? "");
  const [gender, setGender] = useState(savedDraft.gender ?? "");
  const [dob, setDob] = useState(savedDraft.dob ?? "");
  const [previewImage, setPreviewImage] = useState<string | null>(
    savedDraft.profileImageUploaded ? "__uploaded__" : null,
  );

  React.useEffect(() => {
    writeRegistrationDraft({
      fullName,
      email,
      phone,
      gender,
      dob,
      profileImageUploaded: Boolean(previewImage),
    });
  }, [fullName, email, phone, gender, dob, previewImage]);

  React.useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
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
            {previewImage ? (
              <img
                src={previewImage}
                alt="Uploaded profile preview"
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              <>
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
              </>
            )}
          </button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
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
              required
              placeholder="Full Name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="w-full rounded-md border border-white/30 bg-white/10 px-3 py-2.5 text-sm text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Please enter your full name
            </p>
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-white/85">
              What&apos;s your email?
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="E-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-white/30 bg-white/10 px-3 py-2.5 text-sm text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Please enter a valid Email address
            </p>
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm text-white/85">
              What&apos;s your phone number?
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="Phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-md border border-white/30 bg-white/10 px-3 py-2.5 text-sm text-white backdrop-blur-md outline-none focus:border-[#1DB954]"
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Please enter your WhatsApp number
            </p>
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
              required
              value={gender}
              placeholder="Select gender"
              onChange={setGender}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Please select your gender
            </p>
          </div>

          <div>
            <label htmlFor="dob" className="mb-1 block text-sm text-white/85">
              What&apos;s your date of birth?
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              required
              value={dob}
              onChange={(event) => setDob(event.target.value)}
              className="w-full rounded-md border border-white/30 bg-white/10 px-3 py-2.5 text-sm text-white backdrop-blur-md outline-none focus:border-[#1DB954] [color-scheme:dark]"
            />
            <p className="mt-1 text-xs font-semibold text-white/75">
              Please enter your date of birth
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
