"use client";

import React, { useState } from "react";
import AuthSideBanner from "@/components/auth/AuthSideBanner";
import DynamicAuthForm from "@/components/auth/DynamicAuthForm";
import Button from "@/components/ui/Button";
import authSchema from "@/config/auth-schema.json";

export default function SignupView() {
  const [submittedData, setSubmittedData] = useState<Record<string, string> | null>(null);

  const handleSubmitSuccess = (data: Record<string, string>) => {
    setSubmittedData(data);
  };

  return (
    <section className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-zinc-50 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden glass-panel bg-white shadow-2xl flex flex-col md:flex-row min-h-[500px] md:min-h-[600px] animate-fade-in-up">
        {submittedData ? (
          /* Success Screen */
          <div className="w-full h-full p-8 sm:p-10 flex flex-col justify-center text-left">
            <div className="space-y-6 max-w-md mx-auto w-full">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex gap-3 text-emerald-600">
                <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-sm">Account Created!</h4>
                  <p className="text-xs text-emerald-600/80 mt-0.5">
                    Your account has been successfully configured in our system.
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
                onClick={() => setSubmittedData(null)}
                variant="outline"
              >
                Go Back
              </Button>
            </div>
          </div>
        ) : (
          <>
            <AuthSideBanner />
            <div className="flex-1 flex flex-col justify-center bg-white">
              <DynamicAuthForm
                activeSchema={authSchema.signup}
                mode="signup"
                onSubmitSuccess={handleSubmitSuccess}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
