"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import AuthModal from "@/components/auth/AuthModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup">("signup");

  const openModal = (mode: "login" | "signup") => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar onSignUpClick={() => openModal("signup")} />

      <section className="flex-1 flex flex-col   justify-center items-center">
        {/* Hero Section */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-2 py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left Copy */}
          <div className="flex-1 space-y-6 max-w-xl text-left">

            <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-text-main">
              Fast &amp; Secure <br />
              Financial Services <br />
              <span className="text-primary font-serif-600">
                Funds24.in
              </span>
            </h1>
            <p className="text-text-muted text-lg leading-relaxed font-medium">
              As a certified Direct Selling Agent (DSA), we provide access to multiple lenders, transparent comparisons, and a fully digital experience. Your financial goals, simplified.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => openModal("signup")}
                type="button"
                className="px-6 py-3.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover active:scale-95 transition shadow-lg shadow-primary/10 cursor-pointer"
              >
                Check Eligibility
              </button>
              <button
                onClick={() => openModal("login")}
                type="button"
                className="px-6 py-3.5 rounded-xl border border-zinc-200 bg-white text-text-main text-sm font-bold hover:bg-slate-50 transition cursor-pointer"
              >
                Explore Products
              </button>
            </div>
          </div>

          {/* Right Graphical Card - Solid Navy with mesh grid */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="w-full h-80 lg:h-96 rounded-3xl bg-primary flex flex-col  justify-center p-8 sm:p-12 relative overflow-hidden shadow-2xl">

              <div className="space-y-2 z-10 text-left">
                <span className="text-3xl font-extrabold text-white  ">Financial Solutions</span>
                <h2 className="text-sm font-semibold text-white tracking-tight leading-snug">
                  Tailored for You
                </h2>
                <p className="text-slate-400 text-sm font-medium">
                  Quick approval • Minimal documentation
                </p>
              </div>

              {/* Visual Dot grid */}
              <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className="h-1.5 w-1.5 rounded-full bg-white"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Modal Overlay */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode={modalMode}
      />
    </>
  );
}
