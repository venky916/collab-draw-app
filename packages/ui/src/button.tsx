"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant: "primary" | "secondary" | "outline";
  size: string;
  onClick: () => void;
}

export const Button = ({
  variant,
  size,
  children,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${className} ${variant === "primary" ? "bg-primary" : ""} ${size === "lg" ? "px-4 py-2" : "px-2 py-1"} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
