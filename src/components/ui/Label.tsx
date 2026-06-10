import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export default function Label({ children, required, className = "", ...props }: LabelProps) {
  return (
    <label className={`text-xs font-semibold text-text-main ${className}`} {...props}>
      {children}
      {required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
  );
}
