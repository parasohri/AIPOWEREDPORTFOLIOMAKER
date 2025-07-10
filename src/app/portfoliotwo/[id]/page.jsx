// app/portfolio/[id]/page.tsx
'use client';

import React, { useEffect } from 'react';
import PortfolioAIChat from '../../../components/PortfolioAIChat/page';
import { useParams } from 'next/navigation';
import { useDataStore } from '../../store/Store';
import { Boxes } from './components/ui/background-boxes';
import { cn } from './lib/utils'; // Assuming this utility is for classnames, ensure it's correctly implemented
import { Vortex } from './components/ui/vortex'; // Importing the Vortex component
const PortfolioPage = () => {
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
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Boxes with a subtle overlay */}
      <div className="absolute inset-0 z-0">
          
        <div className="absolute inset-0 bg-black opacity-30"></div> {/* Dark overlay for better text contrast */}
      </div>
  <Vortex
        
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
      {/* Header Section */}
      <header className="relative z-20 px-6 sm:px-10 py-16 sm:py-24 text-center bg-gradient-to-b from-transparent to-slate-950/70">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-400 to-purple-500 drop-shadow-lg animate-fade-in-down">
          {username || "Your Name"}
        </h1>
        
        {console.log("Data fetched:", data) /* Debugging line to check fetched data */ };
        
        <p className="text-xl sm:text-2xl text-neutral-300 mt-4 font-light animate-fade-in-up">
          {role || "Aspiring Developer"}
        </p>
        <p className="mt-6 text-neutral-400 max-w-4xl mx-auto text-base sm:text-lg leading-relaxed animate-fade-in-up delay-100">
          {about || "A passionate individual ready to create amazing web experiences and solve challenging problems."}
        </p>
        <div className="mt-8 flex justify-center gap-4 animate-fade-in-up delay-200">
          {githublink && (
            <a
              href={githublink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          )}
          {linkdienlink && (
            <a
              href={linkdienlink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.493-1.1-1.1s.493-1.1 1.1-1.1 1.1.493 1.1 1.1-.493 1.1-1.1 1.1zm7 6.891h-2v-3.5c0-.811-.018-1.859-1.125-1.859-1.124 0-1.3 875-1.3 1.797v3.562h-2v-6h1.929v.891h.028c.325-.592 1.115-1.218 2.203-1.218 2.355 0 2.793 1.503 2.793 3.454v3.973z"/></svg>
              LinkedIn
            </a>
          )}
        </div>
      </header></Vortex>

      {/* Main Content Sections */}
      <main className="relative z-20 px-6 sm:px-10 md:px-20 py-10 max-w-7xl mx-auto flex flex-col gap-16">
        {/* Skills Section */}<PortfolioAIChat userData={data} />
        {skills.length > 0 && (
          <section className="bg-slate-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-400">
              My Skills
            </h2>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-base font-medium transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="bg-slate-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl animate-fade-in-up delay-100">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-red-400">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl flex flex-col"
                >
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-neutral-400 mb-5 flex-grow">
                    {proj.description}
                  </p>
                  <div className="flex gap-4 flex-wrap mt-auto">
                    {proj.demoLink && (
                      <a
                        href={proj.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 font-medium transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3.536 3.536A2 2 0 0110.121 12H7.172a2 2 0 01-1.414-.586l-2.828-2.828a2 2 0 010-2.828 2 2 0 012.828 0L7.586 7.172a1 1 0 001.414 0L12.586 4.586z" clipRule="evenodd"/><path fillRule="evenodd" d="M7.414 15.414a2 2 0 11-2.828-2.828l3.536-3.536A2 2 0 019.879 8h2.949a2 2 0 011.414.586l2.828 2.828a2 2 0 11-2.828 2.828L12.414 12.828a1 1 0 00-1.414 0L7.414 15.414z" clipRule="evenodd"/></svg>
                        Demo
                      </a>
                    )}
                    {proj.githubLink && (
                      <a
                        href={proj.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 font-medium transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386c0-6.627-5.373-12-12-12z"/></svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section (if data is available) */}
        {Education.length > 0 && (
          <section className="bg-slate-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl animate-fade-in-up delay-200">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
              Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Assuming each Education object has properties like 'degree', 'institution', 'year' */}
              {Education.map((edu, idx) => (
                <div key={idx} className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white">{edu.title|| "Degree"}</h3>
                  <p className="text-md text-neutral-300 mt-1">{edu.company || "Institution"}</p>
                  <p className="text-sm text-neutral-400 mt-1">{edu.period || "Year"}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer Section */}
      <footer className="relative z-20 mt-20 text-center text-sm text-neutral-500 py-8 border-t border-slate-700/60 px-4 bg-slate-950/70 backdrop-blur-sm">
       
        <p className="break-words text-base sm:text-lg text-neutral-400 mb-3">
          Contact: {email && <a href={`mailto:${email}`} className="text-blue-400 hover:underline">{email}</a>}
          {email && phoneno && " | "}
          {phoneno && <a href={`tel:${phoneno}`} className="text-blue-400 hover:underline">{phoneno}</a>}
        </p>
        <div className="flex justify-center gap-6 mt-4 flex-wrap">
          {githublink && (
            <a href={githublink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline text-base transition-colors flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          )}
          {linkdienlink && (
            <a href={linkdienlink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline text-base transition-colors flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.493-1.1-1.1s.493-1.1 1.1-1.1 1.1.493 1.1 1.1-.493 1.1-1.1 1.1zm7 6.891h-2v-3.5c0-.811-.018-1.859-1.125-1.859-1.124 0-1.3.875-1.3 1.797v3.562h-2v-6h1.929v.891h.028c.325-.592 1.115-1.218 2.203-1.218 2.355 0 2.793 1.503 2.793 3.454v3.973z"/></svg>
              LinkedIn
            </a>
          )}
        </div>
        <p className="mt-5 text-neutral-600 text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} {username || "Your Portfolio"}. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default PortfolioPage;