"use client";

import React, { useState, useEffect } from "react";
import AuthSideBanner from "./AuthSideBanner";
import DynamicAuthForm from "./DynamicAuthForm";
import Button from "@/components/ui/Button";
import authSchema from "@/config/auth-schema.json";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, initialMode }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [submittedData, setSubmittedData] = useState<Record<string, string> | null>(null);

  // Sync mode state when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSubmittedData(null);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleToggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  };

  const handleSubmitSuccess = (data: Record<string, string>) => {
    setSubmittedData(data);
  };

  const activeSchema = mode === "login" ? authSchema.login : authSchema.signup;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible rounded-3xl glass-panel bg-white shadow-2xl flex flex-col md:flex-row min-h-[500px] md:min-h-[600px] z-10 animate-fade-in-up">
        
        {/* Close Button (Icon) */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 text-zinc-400 hover:text-zinc-600 focus:outline-none p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submittedData ? (
          /* Success Screen */
          <div className="w-full h-full p-8 sm:p-10 flex flex-col justify-center text-left">
            <div className="space-y-6 max-w-md mx-auto w-full py-12">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex gap-3 text-emerald-600">
                <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-sm">
                    {mode === "login" ? "Login Succeeded!" : "Account Created!"}
                  </h4>
                  <p className="text-xs text-emerald-600/80 mt-0.5">
                    {mode === "login"
                      ? "Authenticated successfully with the config system."
                      : "Your account has been successfully configured."}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                  Form Payload Response
                </span>
                <pre className="p-4 rounded-xl bg-zinc-950 text-emerald-400 font-mono text-xs overflow-x-auto shadow-inner">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </div>

              <Button
                onClick={onClose}
                variant="outline"
              >
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          <>
            <AuthSideBanner />
            <div className="flex-1 flex flex-col justify-center bg-white">
              <DynamicAuthForm
                activeSchema={activeSchema}
                mode={mode}
                toggleMode={handleToggleMode}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
