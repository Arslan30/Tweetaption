import React, { forwardRef } from "react";
import { Spinner } from "./Spinner";
import { cn } from "../lib/utils";

const ButtonForward: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    loading?: boolean;
    secondary?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
  }
> = ({ onClick, disabled, children, loading, secondary, className, type }, ref) => {
  return (
    <button
      type={type}
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center py-1.5 appearance-none rounded w-fit px-3 font-geist min-w-fit",
        "text-white bg-yellow-400 hover:bg-amber-400 active:bg-yellow-500 transition duration-50",
        "disabled:bg-button-disabled-color disabled:text-disabled-text-color disabled:cursor-not-allowed",
        secondary
          ? "bg-white text-black hover:bg-amber-100 active:bg-amber-200"
          : undefined,
          className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {loading && (
        <>
          <Spinner size={15} className="mr-2" color={disabled ? "var(--disabled-text-color)" : "white"}></Spinner>
        </>
      )}
      {children}
    </button>
  );
};

export const Button = forwardRef(ButtonForward);
