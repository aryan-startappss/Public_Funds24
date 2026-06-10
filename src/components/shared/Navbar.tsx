import React from "react";
import Link from "next/link";

interface NavbarProps {
  onSignUpClick?: () => void;
}

export default function Navbar({ onSignUpClick }: NavbarProps) {
  return (
    <header className="w-full bg-white  border-b border-zinc-200 shadow-sm sticky top-0 z-10 transition-colors">
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

        {/* Action - Display only Sign Up button */}
        <div className="flex items-center">
          <button
            onClick={onSignUpClick}
            type="button"
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
