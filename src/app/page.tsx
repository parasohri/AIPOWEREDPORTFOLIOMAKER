"use client";
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ClerkProvider, SignedOut, SignIn, SignOutButton } from "@clerk/nextjs"
import { useEffect } from "react"
import { useUser } from "@clerk/nextjs";
export default function Home() {
  const { isSignedIn } =useUser();
  useEffect( () => {
localStorage.setItem("po", "0");
    
    if (isSignedIn) {
      // Redirect to the dashboard or another page if signed in
      window.location.href = "/Dashboard";
    }
    window.location.href = "/sign-in";
  }, [])
  return (
    
    <main className="min-h-screen  ">
  {/* //yahan signin rkhna han so sign up ke bad yhan aaye to redirect kr denge */}
      
    </main> 
  )
}

