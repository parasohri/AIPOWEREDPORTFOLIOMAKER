"use client";

import React, { useEffect } from "react";
import { LampContainer } from "./components/ui/lamp";
import { useParams } from "next/navigation";
import { useDataStore } from "../../store/Store";
import { motion } from "motion/react";
import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";
import PortfolioAIChat from '../../../components/PortfolioAIChat/page';
import { CardSpotlight } from "./components/ui/card-spotlight";

function Page() {
  const { id } = useParams();
  const { data, fetchdata } = useDataStore();

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchdata(id);
    }
  }, [id, fetchdata]);

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
    username = "Guest",
    role = "Professional",
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
    <div className="bg-slate-950 text-white min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <BackgroundBeamsWithCollision className="min-h-screen flex flex-col items-center justify-center bg-slate-950 relative z-0">
        <div className="relative w-full max-w-6xl h-[450px] sm:h-[500px] overflow-hidden flex items-center justify-center px-6">
          <LampContainer>
            <motion.h1
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent"
            >
              {username}
              <br />
              <span className="text-blue-400">{role}</span>
            </motion.h1>
          </LampContainer>
        </div>

        <PortfolioAIChat userData={data} />
      </BackgroundBeamsWithCollision>

      {/* About Me */}
      <section className="max-w-3xl mx-auto py-8 px-4 sm:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4 text-blue-400"
        >
          About Me
        </motion.h2>
        <p className="text-lg text-neutral-300 leading-relaxed">{about}</p>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-purple-400">
            Skills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-3 sm:p-4 rounded-xl bg-slate-800 shadow-lg text-center text-sm sm:text-base font-medium"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      {Education.length > 0 && (
        <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-10 text-green-400">
            Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-lg bg-slate-900 shadow-md"
              >
                <h3 className="text-xl font-semibold">{edu.title}</h3>
                <p className="text-neutral-400">{edu.company}</p>
                <p className="text-sm text-neutral-500">{edu.period}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-pink-400">
              Projects
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <CardSpotlight
                  key={idx}
                  className="flex flex-col justify-between p-6 rounded-xl bg-slate-900 shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
                >
                  <p className="text-xl font-bold relative z-20 mt-2 text-white">
                    {project.title}
                  </p>
                  <p className="text-neutral-400 flex-1 mb-4 relative z-20">
                    {project.description}
                  </p>
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-30 mt-auto text-blue-400 hover:underline font-medium"
                    >
                      View Project →
                    </a>
                  )}
                </CardSpotlight>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto py-16 px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400">Contact</h2>
        <p className="mb-2">📧 {email}</p>
        <p className="mb-6">📞 {phoneno}</p>
        <div className="flex justify-center flex-wrap gap-6">
          {githublink && (
            <a
              href={githublink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white transition"
            >
              GitHub
            </a>
          )}
          {linkdienlink && (
            <a
              href={linkdienlink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white transition"
            >
              LinkedIn
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

export default Page;
