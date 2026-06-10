import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-zinc-200 transition-colors py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-text-muted">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm text-text-main">Funds24</span>
          <span>• Verified DSA Network</span>
        </div>
        <p>
          © 2026 Funds24.in. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
