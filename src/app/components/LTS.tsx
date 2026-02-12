// app/components/LTS.tsx
import React from "react";

const LTS = () => {
  return (
    <div
      className="
        bg-gray-900 
        text-white 
        rounded-2xl 
        shadow-lg 
        overflow-hidden
        mx-auto my-10
        w-[450px] h-[800px]      /* Desktop card size */
        sm:w-full sm:h-screen sm:rounded-none sm:shadow-none sm:my-0
      "
    >
      {/* Top Image */}
      <div className="w-full h-1/2 sm:h-1/3 bg-#1E1E1E">
        <img
          src="/bg1.png"
          alt="Album cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col justify-between h-1/2 sm:h-2/3 sm:p-2">
        <div>
          <h2 className="text-xl font-bold mb-2 sm:text-2xl">Song Title</h2>
          <p className="text-gray-300 sm:text-lg">Artist Name</p>
        </div>

        <div className="mt-auto">
          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition sm:py-3">
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default LTS;
