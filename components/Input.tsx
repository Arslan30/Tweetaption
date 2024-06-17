import React, { useCallback } from "react";
import { cn } from "../lib/utils";

export const Input: React.FC<{
  text: string;
  placeholder?: string;
  name?: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  className?: string;
}> = ({ text, setText, disabled, placeholder, name, className }) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setText(e.currentTarget.value);
    },
    [setText],
  );

  return (
    <input
      className={cn("rounded-sm tracking-wider px-2 flex w-full bg-transparent text-base", "focus:border-focused-border-color outline-none", className)}
      disabled={disabled}
      placeholder={placeholder}
      name={name}
      value={text}
      onChange={onChange}
    />
  );
};
