// app/page.tsx
import React from "react";
import LTS from "./components/LTS";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <LTS />
    </div>
  );
}
