"use client";
import React, { useContext } from "react";
import { ErrorContext } from "../../contexts/ErrorContext";

const ErrorNotification = () => {
  const context = React.useContext(ErrorContext);

  if (!context) {
    throw new Error("MyComponent must be used within an ErrorProvider");
  }

  const { errors, addError, clearError, clearAllErrors } = context;
  console.log("errors: ", errors);

  return (
    <div>
      {Object.keys(errors).length > 0 && (
        <div className="error-notification">
          <ul>
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ErrorNotification;
