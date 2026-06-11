"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  onSignUpClick?: () => void;
}

export default function Navbar({ onSignUpClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-zinc-200 shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand logo container */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg text-white font-extrabold text-lg">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-text-main">
            Funds<span className="text-primary font-serif-600">24</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-text-muted" aria-label="Main Navigation">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <a href="#" className="hover:text-primary transition-colors">Products</a>
          <a href="#" className="hover:text-primary transition-colors">Services</a>
          <a href="#" className="hover:text-primary transition-colors">About</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </nav>

        {/* Action Button & Hamburger */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <button
              onClick={onSignUpClick}
              type="button"
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="md:hidden p-2 rounded-xl border border-zinc-200 hover:bg-slate-50 transition cursor-pointer text-text-main"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white animate-fade-in-up">
          <nav className="flex flex-col px-4 py-4 space-y-3 text-sm font-semibold text-text-muted">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-primary transition-colors"
            >
              Products
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-primary transition-colors"
            >
              Contact
            </a>
            <div className="pt-2 border-t border-zinc-100 sm:hidden">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onSignUpClick?.();
                }}
                type="button"
                className="w-full text-center px-5 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover active:scale-95 transition-all cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
