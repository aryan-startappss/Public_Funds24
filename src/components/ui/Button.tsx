import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "w-full py-3.5 px-5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:scale-[1.012] active:scale-[0.985] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm";

  const variantClasses = {
    primary:
      "bg-primary hover:bg-primary-hover text-white shadow-primary/10 hover:shadow-primary/20",
    secondary:
      "bg-accent hover:opacity-90 text-white shadow-accent/10 hover:shadow-accent/20",
    outline:
      "border border-zinc-200 bg-white text-text-main hover:bg-slate-50",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span 
          className="h-4 w-4 rounded-full border-2 border-t-transparent border-current animate-spin" 
          aria-hidden="true"
        />
      ) : (
        children
      )}
    </button>
  );
}
