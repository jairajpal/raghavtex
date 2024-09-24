"use client";
import { createContext, useState, ReactNode } from "react";

// Define the type for errors
interface ErrorState {
  [key: string]: string;
}

// Define the type for the context
interface ErrorContextType {
  errors: ErrorState;
  addError: (field: string, message: string) => void;
  clearError: (field: string) => void;
  clearAllErrors: () => void;
}

// Create Error Context with default values
export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined
);

// Define a provider component
export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<ErrorState>({});

  const addError = (field: string, message: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
  };

  const clearError = (field: string) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return (
    <ErrorContext.Provider
      value={{ errors, addError, clearError, clearAllErrors }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
