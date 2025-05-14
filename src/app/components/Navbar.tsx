"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isClick, setIsClick] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  const closeNavbar = () => {
    setIsClick(false);
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } 
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav className="bg-white fixed w-full z-10 top-0">
      <div className="max-w-8xl mx-auto px-4 flex sm:justify-around justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-black" onClick={closeNavbar}>
            <Image
              src="/Ignite-Nework-black.png"
              alt="Ignite Network Logo"
              width={100}
              height={50}
              className="mr-2"
            />
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="flex space-x-4">
            <Link
              href="#"
              className={`text-black font-bold flex items-center ${
                activeSection === "/" ? "text-teal-700" : "hover:text-green-800"
              }`}
              onClick={closeNavbar}
            >
              Explore
            </Link>
            <Link
              href="#networks"
              className={`text-black font-bold flex items-center ${
                activeSection === "networks"
                  ? "text-teal-700"
                  : "hover:text-green-800"
              }`}
              onClick={closeNavbar}
            >
              Networks
            </Link>
            <Link
              href="#stats"
              className={`text-black font-bold flex items-center ${
                activeSection === "stats"
                  ? "text-teal-700"
                  : "hover:text-green-800"
              }`}
              onClick={closeNavbar}
            >
              Stats
            </Link>
            <Link
              href="#resources"
              className={`text-black font-bold flex items-center ${
                activeSection === "resources"
                  ? "text-teal-700"
                  : "hover:text-green-800"
              }`}
              onClick={closeNavbar}
            >
              Resources
            </Link>
            <Link
              href="#about_us"
              className={`text-black font-bold flex items-center ${
                activeSection === "about_us"
                  ? "text-teal-700"
                  : "hover:text-green-800"
              }`}
              onClick={closeNavbar}
            >
              About Us
            </Link>
          </div>
        </div>
        <div className="md:hidden">
          <button
            className="inline-flex p-4 rounded-md text-green-900 md:text-black hover:text-teal-700  focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={toggleNavbar}
          >
            {isClick ? (
              <svg
                className="h-8 w-9"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isClick && (
        <div className="md:hidden text-center">
          <div className="px-5 pt-5 pb-9 space-y-2">
            <Link
              href="#"
              className={`text-gray-900 font-medium text-2xl leading-10 block transition duration-300 ${
                activeSection === "" ? "text-green-500 underline" : ""
              }`}
              onClick={closeNavbar}
            >
              Explore
            </Link>
            <Link
              href="#networks"
              className={`text-gray-900 font-medium text-2xl leading-10 block transition duration-300 ${
                activeSection === "networks" ? "text-green-500 underline" : ""
              }`}
              onClick={closeNavbar}
            >
              Networks
            </Link>
            <Link
              href="#stats"
              className={`text-gray-900 font-medium text-2xl leading-10 block transition duration-300 ${
                activeSection === "stats" ? "text-green-500 underline" : ""
              }`}
              onClick={closeNavbar}
            >
              Stats
            </Link>
            <Link
              href="#resources"
              className={`text-gray-900 font-medium text-2xl leading-10 block transition duration-300 ${
                activeSection === "resources" ? "text-green-500 underline" : ""
              }`}
              onClick={closeNavbar}
            >
              Resources
            </Link>
            <Link
              href="#about_us"
              className={`text-gray-900 font-medium text-2xl leading-10 block transition duration-300 ${
                activeSection === "about_us" ? "text-green-500 underline" : ""
              }`}
              onClick={closeNavbar}
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;