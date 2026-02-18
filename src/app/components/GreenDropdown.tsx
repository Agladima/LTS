"use client";

import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

type DropdownOption = {
  value: string;
  label: string;
};

type GreenDropdownProps = {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  options: DropdownOption[];
  onChange: (nextValue: string) => void;
};

export default function GreenDropdown({
  id,
  name,
  value,
  placeholder,
  options,
  onChange,
}: GreenDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" id={id} name={name} value={value} />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-md border border-white/30 bg-white/10 px-4 py-4 text-left text-base text-white backdrop-blur-md outline-none transition focus:border-[#1DB954]"
      >
        <span className={selectedLabel ? "text-white" : "text-white/60"}>
          {selectedLabel ?? placeholder}
        </span>
        {isOpen ? (
          <FaAngleUp className="text-base text-white/70" aria-hidden="true" />
        ) : (
          <FaAngleDown className="text-base text-white/70" aria-hidden="true" />
        )}
      </button>

      {isOpen ? (
        <div
          role="listbox"
          className="absolute z-30 mt-1 w-full overflow-hidden rounded-md border border-white/30 bg-black"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-3 text-left text-sm transition ${
                  isSelected
                    ? "bg-[#1DB954] text-black"
                    : "text-white hover:bg-[#1DB954] hover:text-black"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
