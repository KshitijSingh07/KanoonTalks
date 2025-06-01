"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import ThemeToggle from "../lib/ThemeToggle";
import { motion } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Navbar() {
  const [examOpen, setExamOpen] = useState(false);
  const [lawOpen, setLawOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setExamOpen(false);
    setLawOpen(false);
  };

  const toggleExamMobile = () => setExamOpen((prev) => !prev);
  const toggleLawMobile = () => setLawOpen((prev) => !prev);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false); // Close mobile menu if open
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const NavLink = ({ href, label }) => (
    <Link href={href}>
      <span className="hover:text-blue-500 transition-colors duration-200 cursor-pointer text-lg">
        {label}
      </span>
    </Link>
  );

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`sticky top-0 z-50 backdrop-blur-md shadow-md px-6 py-4 flex flex-col md:flex-row justify-between items-center transition-colors duration-300 ${scrolled ? "bg-navbar-bg" : "bg-transparent"
        }`}
    >
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link
          href="/"
          className={`${poppins.className} text-3xl md:text-4xl font-bold text-company-name tracking-widest drop-shadow-sm hover:text-amber-800 transition-transform duration-300`}
        >
          KanoonTalks
        </Link>

        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
          <button
            onClick={toggleMobileMenu}
            className="text-navbar-text focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6 text-navbar-text items-center relative">
        {role === "admin" && <NavLink href="/admin/dashboard" label="Admin" />}
        <NavLink href="/" label="Home" />
        <NavLink href="/about" label="About" />
        <NavLink href="/blogs" label="Blogs" />

        {/* Exam Material Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setExamOpen(true)}
          onMouseLeave={() => setExamOpen(false)}
        >
          <div className="flex items-center gap-1 cursor-pointer text-lg hover:text-blue-500">
            <span>Exam Material</span>
            <svg
              className="w-4 h-4 transition-transform"
              style={{ transform: examOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {examOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 w-64 bg-dropdown-bg rounded-md shadow-xl ring-1 ring-black ring-opacity-5 z-50"
            >
              <ul className="py-2 text-dropdown-text text-sm space-y-1">
                <li className="px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                  <Link href="/exam-material/study-materials">Study Materials</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                  <Link href="/exam-material/aibe">AIBE</Link>
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        {/* Law Notes Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setLawOpen(true)}
          onMouseLeave={() => setLawOpen(false)}
        >
          <div className="flex items-center gap-1 cursor-pointer text-lg hover:text-blue-500">
            <span>Law Notes</span>
            <svg
              className="w-4 h-4 transition-transform"
              style={{ transform: lawOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {lawOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 w-64 bg-dropdown-bg rounded-md shadow-xl ring-1 ring-black ring-opacity-5 z-50"
            >
              <ul className="py-2 text-dropdown-text text-sm space-y-1">
                <li className="px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                  <Link href="/law-notes/subject-wise-notes">Subject-Wise Notes</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                  <Link href="/law-notes/bare-acts">Bare Acts</Link>
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="text"
            className="px-3 py-1 outline-none text-navbar-text bg-transparent w-48 md:w-64"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearch}
            className="px-3 text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden w-full pt-4 pb-4 border-t border-gray-700 bg-dropdown-bg transition-colors duration-300"
        >
          <ul className="flex flex-col items-start px-4 space-y-4 text-dropdown-text text-lg py-2">
            {role === "admin" && (
              <li>
                <Link href="/admin/dashboard" onClick={toggleMobileMenu}>
                  Admin
                </Link>
              </li>
            )}
            <li>
              <Link href="/" onClick={toggleMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={toggleMobileMenu}>
                About
              </Link>
            </li>
            <li>
              <Link href="/blogs" onClick={toggleMobileMenu}>
                Blogs
              </Link>
            </li>

            <li className="w-full">
              <div
                className="flex justify-between items-center w-full cursor-pointer"
                onClick={toggleExamMobile}
              >
                <span>Exam Material</span>
                <svg
                  className="w-4 h-4 transform transition-transform"
                  style={{
                    transform: examOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {examOpen && (
                <ul className="ml-4 mt-2 space-y-2 text-base">
                  <li>
                    <Link
                      href="/exam-material/study-materials"
                      onClick={toggleMobileMenu}
                    >
                      Study Materials
                    </Link>
                  </li>
                  <li>
                    <Link href="/exam-material/aibe" onClick={toggleMobileMenu}>
                      AIBE
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="w-full">
              <div
                className="flex justify-between items-center w-full cursor-pointer"
                onClick={toggleLawMobile}
              >
                <span>Law Notes</span>
                <svg
                  className="w-4 h-4 transform transition-transform"
                  style={{
                    transform: lawOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {lawOpen && (
                <ul className="ml-4 mt-2 space-y-2 text-base">
                  <li>
                    <Link
                      href="/law-notes/subject-wise-notes"
                      onClick={toggleMobileMenu}
                    >
                      Subject-Wise Notes
                    </Link>
                  </li>
                  <li>
                    <Link href="/law-notes/bare-acts" onClick={toggleMobileMenu}>
                      Bare Acts
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Search Input on mobile */}
            {/* Mobile Search Input */}
            <li className="w-full px-4 py-2">
              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type="text"
                  className="px-3 py-2 text-sm text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-transparent outline-none w-full"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
                <button
                  onClick={handleSearch}
                  className="px-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-white transition-colors"
                  aria-label="Search"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>
            </li>

          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
}
