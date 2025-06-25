"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useParams } from "next/navigation";
export function Navbar() {
   const params = useParams(); // This is a hook from 'next/navigation'

   
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [name,setName]=useState("")
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(`/api/fetchdata?id=${params.id}`);
      const result = await res.json();

      if (result?.project?.username) {
        setName(result.project.username);
      } else {
        console.warn("Project not found or invalid response.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  if (params.id) {
    fetchData();
  }

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, [params.id]);


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "  backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <p
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
          >
           {name}
          </p>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8 ">
            <NavLink href="#" label="Home"  />
            <NavLink href="#about" label="About" />
            <NavLink href="#projects" label="Projects" />
            <NavLink href="#contact" label="Contact" />
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button
              className="ml-4 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden "
        >
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-2">
            <MobileNavLink
              href="#"
              label="Home"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              href="#about"
              label="About"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              href="#projects"
              label="Projects"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              href="#contact"
              label="Contact"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </nav>
        </motion.div>
      )}
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative text-lg font-medium  transition-colors group"
    >
      {label}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <a
      href={href}
      className="text-lg font-medium transition-colors py-2"
      onClick={onClick}
    >
      {label}
    </a>
  );
}