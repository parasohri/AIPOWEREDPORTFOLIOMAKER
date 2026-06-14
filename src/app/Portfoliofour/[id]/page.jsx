// app/portfolio/[id]/page.tsx
'use client';

import React, { useEffect } from 'react';
import PortfolioAIChat from '../../../components/PortfolioAIChat/page';
import { useParams } from 'next/navigation';
import { useDataStore } from '../../store/Store';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
        <div className="text-center p-6 rounded-lg bg-white shadow-xl animate-pulse border">
          <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Building your portfolio...
          </h1>
          <p className="text-lg text-gray-600">
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
    Education = [],
  } = data;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 relative overflow-hidden">

      {/* Header */}
      <header className="relative z-20 px-6 sm:px-10 py-16 sm:py-24 text-center bg-gradient-to-b from-white to-gray-100">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-purple-600">
          {username || "Your Name"}
        </h1>

        <p className="text-xl sm:text-2xl text-gray-700 mt-4">
          {role || "Aspiring Developer"}
        </p>

        <p className="mt-6 text-gray-600 max-w-4xl mx-auto text-base sm:text-lg leading-relaxed">
          {about ||
            "A passionate individual ready to create amazing web experiences and solve challenging problems."}
        </p>

        <div className="mt-8 flex justify-center gap-4">
          {githublink && (
            <a
              href={githublink}
              target="_blank"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-md"
            >
              GitHub
            </a>
          )}

          {linkdienlink && (
            <a
              href={linkdienlink}
              target="_blank"
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-md"
            >
              LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="relative z-20 px-6 sm:px-10 md:px-20 py-10 max-w-7xl mx-auto flex flex-col gap-16">

        {/* AI Chat */}
        <PortfolioAIChat userData={data} />

        {/* Skills */}
        {skills.length > 0 && (
          <section className="bg-white p-6 sm:p-8 rounded-2xl border shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
              My Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="bg-white p-6 sm:p-8 rounded-2xl border shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-6 rounded-xl border shadow-sm hover:border-blue-500 transition-all hover:-translate-y-2"
                >
                  <h3 className="text-xl font-semibold mb-3">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-5">{proj.description}</p>

                  <div className="flex gap-4">
                    {proj.demoLink && (
                      <a
                        href={proj.demoLink}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        Demo
                      </a>
                    )}

                    {proj.githubLink && (
                      <a
                        href={proj.githubLink}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {Education.length > 0 && (
          <section className="bg-white p-6 sm:p-8 rounded-2xl border shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Education
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Education.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-5 rounded-lg border shadow-sm"
                >
                  <h3 className="text-xl font-semibold">{edu.title}</h3>
                  <p className="text-gray-700">{edu.company}</p>
                  <p className="text-gray-500 text-sm">{edu.period}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="relative z-20 text-center text-sm text-gray-600 py-8 border-t bg-white">
        <p>
          Contact:
          {email && (
            <a href={`mailto:${email}`} className="text-blue-600 ml-1 hover:underline">
              {email}
            </a>
          )}
          {phoneno && (
            <>
              {" | "}
              <a href={`tel:${phoneno}`} className="text-blue-600 hover:underline">
                {phoneno}
              </a>
            </>
          )}
        </p>
      </footer>
    </div>
  );
};

export default PortfolioPage;
