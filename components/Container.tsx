import React from "react";

export const InputContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex border transition focus-within:border-yellow-200 bg-yellow-50 focus-within:bg-white p-2 rounded">
      {children}
    </div>
  );
};
