import React from "react";

export const ErrorComp: React.FC<{
  message: string;
}> = ({ message }) => {
  return (
    <div className="flex text-[#e00] font-geist py-3">
      <svg
        fill="none"
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        className="h-5 align-text-bottom mr-1.5"
      >
        <circle cx="12" cy="12" r="10" fill="white"></circle>
        <path d="M12 8v4" stroke="currentColor"></path>
        <path d="M12 16h.01" stroke="currentColor"></path>
      </svg>
      {message}
    </div>
  );
};
