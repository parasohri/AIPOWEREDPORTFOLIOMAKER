'use client'
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import  {useDataStore } from "../../store/Store"
import { useParams } from "next/navigation" 
import { useEffect } from "react"
import PortfolioAIChat from '../../../components/PortfolioAIChat/page';
import { ClerkProvider, SignedOut, SignIn, SignOutButton } from "@clerk/nextjs"
export default function Home() {
    const { id } = useParams();
  const { data, fetchdata } = useDataStore();

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchdata(id);
    }
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center p-6 rounded-lg bg-slate-900 shadow-xl animate-pulse">
          <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Building your portfolio...
          </h1>
          <p className="text-lg text-neutral-400">
            Please wait a moment while we fetch the details.
          </p>
        </div>
      </div>
    );
  }

  const {
    username,
    role,
    about,
    email,
    phoneno,
    githublink,
    linkdienlink,
    skills = [],
    projects = [],
    Education = [], // Assuming Education is an array of educational entries
  } = data;
  return (
    
    <main className="min-h-screen  ">
  
      <Navbar />
    
      <HeroSection />
      
      <AboutSection />
        <PortfolioAIChat userData={data} />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main> 
  )
}

