import React from "react";
import { useTheme } from "./ThemeContext"; // Adjust path as needed
import ThemeToggle from "./ThemeToggleButton"; // Adjust path as needed

const MyComponent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      <ThemeToggle />
      <p>The current theme is {theme}</p>
    </div>
  );
};

export default MyComponent;
