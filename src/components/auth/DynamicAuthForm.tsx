"use client";

import React from "react";
import Link from "next/link";
import { useFormHandler } from "@/hooks/useFormHandler";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
}

interface FormSchema {
  title: string;
  subtitle: string;
  ctaText: string;
  footerText: string;
  footerActionText: string;
  fields: FormField[];
}

interface DynamicAuthFormProps {
  activeSchema: FormSchema;
  mode: "login" | "signup";
  toggleMode?: () => void;
  onSubmitSuccess: (data: Record<string, string>) => void;
}

export default function DynamicAuthForm({
  activeSchema,
  mode,
  toggleMode,
  onSubmitSuccess,
}: DynamicAuthFormProps) {
  const {
    formData,
    errors,
    showPassword,
    isSubmitting,
    shakeId,
    handleChange,
    togglePasswordVisibility,
    handleSubmit,
  } = useFormHandler(activeSchema, onSubmitSuccess);

  // SVG prefix icons based on field settings
  const getFieldIcon = (field: FormField) => {
    const baseStyle = "h-5 w-5 text-zinc-400";
    if (field.type === "email") {
      return (
        <svg className={baseStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
    if (field.type === "password") {
      return (
        <svg className={baseStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    }
    if (field.id === "fullName" || field.id === "firstName" || field.id === "lastName") {
      return (
        <svg className={baseStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    }
    if (field.type === "tel" || field.id === "phone") {
      return (
        <svg className={baseStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div
      className={`w-full md:w-full p-8 sm:p-10 flex flex-col justify-center text-left bg-white ${
        shakeId ? "animate-[shake_0.45s_ease-in-out]" : ""
      }`}
    >
      {/* Title & Description block */}
      <div className="mb-6 pr-8">
        <h3 className="text-2xl font-semibold text-text-main tracking-tight">
          {activeSchema.title}
        </h3>
        <p className="text-text-muted text-sm mt-1.5 leading-relaxed font-semibold">
          {activeSchema.subtitle}
        </p>
      </div>

      {/* Inputs list */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {activeSchema.fields.map((field) => {
          // Render firstName and lastName side-by-side in a 2-column grid row
          if (field.id === "firstName") {
            const lastNameField = activeSchema.fields.find((f) => f.id === "lastName");
            const hasErrorFirst = errors["firstName"];
            const hasErrorLast = lastNameField ? errors["lastName"] : undefined;

            return (
              <div key="name-row" className="grid grid-cols-2 gap-3.5">
                <Input
                  id="firstName"
                  label={field.label}
                  placeholder={field.placeholder}
                  required={field.required}
                  type="text"
                  value={formData["firstName"] || ""}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  error={hasErrorFirst}
                  icon={getFieldIcon(field)}
                />
                {lastNameField && (
                  <Input
                    id="lastName"
                    label={lastNameField.label}
                    placeholder={lastNameField.placeholder}
                    required={lastNameField.required}
                    type="text"
                    value={formData["lastName"] || ""}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    error={hasErrorLast}
                    icon={getFieldIcon(lastNameField)}
                  />
                )}
              </div>
            );
          }

          // Skip lastName since it is handled inside firstName row
          if (field.id === "lastName") {
            return null;
          }

          const isPassword = field.type === "password";
          const isFieldVisible = isPassword ? !!showPassword[field.id] : true;
          const hasError = errors[field.id];

          return (
            <div key={field.id} className="space-y-1 ">
              <Input
                id={field.id}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                type={isPassword ? (isFieldVisible ? "text" : "password") : field.type}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                error={hasError}
                icon={getFieldIcon(field)}
                rightAction={
                  isPassword ? (
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field.id)}
                      className="text-zinc-400 hover:text-zinc-600 focus:outline-none p-1 rounded-md transition cursor-pointer"
                      aria-label={isFieldVisible ? "Hide password" : "Show password"}
                    >
                      {isFieldVisible ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  ) : null
                }
              />

              {/* Forgot password link directly under the password field in Login screen */}
              {field.id === "password" && mode === "login" && (
                <div className="flex justify-end pt-0.5">
                  <a href="#" className="text-xs font-semibold text-slate-800 hover:text-primary transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}
            </div>
          );
        })}

        {/* Action Button */}
        <div className="pt-2">
          <Button type="submit" loading={isSubmitting} variant="primary">
            {activeSchema.ctaText}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </div>

        {/* Divider section */}
        <div className="relative py-1 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200"></div>
          </div>
          <span className="relative px-3 bg-white text-xs font-semibold text-zinc-400">
            or continue with
          </span>
        </div>

        {/* Footer toggler */}
        <p className="text-center text-xs text-zinc-500 font-bold mt-3">
          {activeSchema.footerText}{" "}
          {toggleMode ? (
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary hover:text-primary-hover underline font-extrabold focus:outline-none cursor-pointer"
            >
              {activeSchema.footerActionText}
            </button>
          ) : (
            <Link
              href={mode === "login" ? "/signup" : "/login"}
              className="text-primary hover:text-primary-hover underline font-extrabold focus:outline-none cursor-pointer"
            >
              {activeSchema.footerActionText}
            </Link>
          )}
        </p>

        {/* Fine print */}
        <p className="text-center text-[10px] text-zinc-400 font-semibold mt-1.5">
          By continuing, you agree to our{" "}
          <a href="#" className="underline hover:text-zinc-600">
            Terms
          </a>{" "}
          &amp;{" "}
          <a href="#" className="underline hover:text-zinc-600">
            Privacy Policy
          </a>
        </p>
      </form>
    </div>
  );
}
