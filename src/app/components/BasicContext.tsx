"use client";
import React, { createContext, useContext } from "react";

const BasicContext = createContext({ message: "Hello World" });

export const BasicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("Rendering BasicProvider");
  console.log("message: 33333333");

  return (
    <BasicContext.Provider value={{ message: "Hello World" }}>
      {children}
    </BasicContext.Provider>
  );
};

export const useBasic = () => {
  const context = useContext(BasicContext);
  console.log("message: 222222222");

  console.log("Context: ", context);
  if (!context) {
    throw new Error("useBasic must be used within a BasicProvider");
  }
  return context;
};
