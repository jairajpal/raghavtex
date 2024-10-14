"use client";
import React from "react";
import { useTheme } from "./ThemeContext"; // Adjust path as needed

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <span className="px-2">Day</span>
      <button
        className={`relative inline-flex items-center justify-center w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
          theme === "light" ? "bg-gray-300" : "bg-gray-600"
        }`}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <span
          className={`w-4 h-4 rounded-full transition-transform duration-300 transform ${
            theme === "light"
              ? "-translate-x-3 bg-white"
              : "translate-x-3 bg-yellow-500"
          }`}
        ></span>
        <span className="sr-only">Toggle Theme</span>
      </button>
      <span className="px-2">Night</span>
    </>
  );
};

export default ThemeToggleButton;
