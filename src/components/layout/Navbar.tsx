'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Moon, Sun, Menu, X, BookOpen, Zap, BookMarked, Target, RotateCcw } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { href: '/dashboard', label: 'Topics', icon: BookOpen },
  { href: '/interview', label: 'Interview Prep', icon: Target },
  { href: '/revision', label: 'Revision', icon: RotateCcw },
  { href: '/saved-questions', label: 'Saved', icon: BookMarked },
];

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight leading-none">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Java</span>
              <span className="text-slate-800 dark:text-slate-100"> Digital Notes</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${active
                      ? 'bg-gradient-to-r from-indigo-500/15 to-purple-500/15 text-indigo-700 dark:text-indigo-300 shadow-sm border border-indigo-500/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-white/10'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 hover:border-indigo-500/30 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden w-10 h-10 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200/60 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1.5">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${active
                      ? 'bg-gradient-to-r from-indigo-500/15 to-purple-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-white/10'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
