// src/app/components/BasicTest.tsx
"use client";

import React from "react";
import { useBasic } from "./BasicContext";
import { useTheme } from "./ThemeContext";

export const BasicTest = () => {
  console.log("message: 111111111");
  const { message } = useBasic();
  const { theme } = useTheme();
  console.log("theme: ", theme);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {/* <Component {...pageProps} /> */}
      <h1>hiiiii</h1>
    </div>
  );
};
