"use client";
import React from "react";
import { useTheme } from "./ThemeContext"; // Adjust path as needed

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base mt-4 md:mt-0"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-4 h-4"
          viewBox="0 0 24 24"
        >
          <path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3m15 0h3m-4.22-7.78l-2.12 2.12M6.34 17.66l-2.12 2.12"></path>
        </svg>
      ) : (
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-4 h-4"
          viewBox="0 0 24 24"
        >
          <path d="M12 4v8m0 0v8m0-8H4m8 0h8"></path>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggleButton;
