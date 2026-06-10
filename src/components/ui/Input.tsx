"use client";

import React, { ForwardedRef, forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  rightAction?: React.ReactNode;
}

const Input = forwardRef(
  (
    { label, error, icon, rightAction, id, required, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="space-y-1 w-full text-left">
        <label htmlFor={id} className="sr-only">
          {label} {required && "*"}
        </label>

        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              {icon}
            </div>
          )}

          <input
            id={id}
            ref={ref}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`w-full py-3.5 text-sm rounded-xl bg-slate-50 border transition-all focus:outline-none ${
              icon ? "pl-11" : "px-4"
            } ${rightAction ? "pr-12" : "pr-4"} ${
              error
                ? "border-rose-500 focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                : "border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary"
            } text-text-main placeholder-zinc-400`}
            {...props}
          />

          {rightAction && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
              {rightAction}
            </div>
          )}
        </div>
        {error && (
          <span 
            id={`${id}-error`} 
            className="text-[10px] text-rose-500 font-semibold mt-1 block pl-1"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
