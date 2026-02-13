import React from "react";

const LTS = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Card */}
      <div
        className="
          relative
          w-full h-screen
          bg-black
          sm:min-w-[450px] sm:h-[760px]
          sm:border sm:border-gray-700 sm:rounded-2xl
          overflow-hidden
        "
        style={{
          backgroundImage: "url('/Start.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text Content */}
        <div className="absolute left-6 bottom-[25%] z-10 max-w-[85%]">
          <p className="text-white text-xl leading-snug">
            If{" "}
            <span className="text-green-500 font-semibold">"Leadership"</span>{" "}
            was a <br />
            playlist what would it <br />
            sound like?
          </p>
        </div>
      </div>
    </div>
  );
};

export default LTS;
