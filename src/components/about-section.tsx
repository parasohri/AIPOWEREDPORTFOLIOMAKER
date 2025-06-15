"use client";

import { motion } from "framer-motion";
import { Code, Database, Globe, Laptop, Palette, Server, Brain } from "lucide-react";
import { CardHoverEffect } from "@/components/ui/card-hover-effect";
import { AnimatedText } from "@/components/ui/animated-text";

export function AboutSection() {
  const skills = [
    {
      icon: <Code className="h-6 w-6 text-blue-500" />,
      title: "Frontend",
      description:
        "Creating responsive and interactive user interfaces with React, Next.js, TypeScript, and Tailwind CSS.",
    },
    {
      icon: <Server className="h-6 w-6 text-green-500" />,
      title: "Backend",
      description:
        "Building robust server-side applications with Node.js, Express, Fastify.",
    },
    {
      icon: <Database className="h-6 w-6 text-yellow-500" />,
      title: "Database",
      description:
        "Designing and optimizing database structures with MongoDB, PostgreSQL, MySQL, and Redis.",
    },
    {
      icon: <Globe className="h-6 w-6 text-purple-500" />,
      title: "DevOps",
      description:
        "Deploying and maintaining applications with Docker, Kubernetes, AWS, and CI/CD pipelines.",
    },
    {
      icon: <Palette className="h-6 w-6 text-pink-500" />,
      title: "Design",
      description:
        "Creating beautiful and intuitive user experiences with Figma, Adobe XD, UI/UX principles, and wireframing.",
    },
    {
      icon: <Laptop className="h-6 w-6 text-indigo-500" />,
      title: "Tools",
      description:
        "Utilizing modern development tools like Git, VS Code, Postman for efficient workflows.",
    },
    {
      icon: <Brain className="h-6 w-6 text-cyan-500" />,
      title: "Generative AI",
      description:
        "Integrating AI tools like Gemini AI to generate content, automate responses, and enhance UX with smart features.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <AnimatedText
              text="About Me"
              className="text-4xl md:text-5xl font-bold tracking-tight text-white"
              once={true}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 mt-4 mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-[700px] text-zinc-300 md:text-lg"
          >
            I am a full-stack developer skilled in Docker, Kubernetes, and the MERN stack, with a passion for building scalable apps using Next.js. Recently, I've been diving into Generative AI tools like Gemini AI—exploring how they can automate workflows, enhance UX, and power smart web applications. Let’s connect over tech, AI, or real-time innovation!
          </motion.p>
        </div>

        <div className="mb-16">
          <CardHoverEffect items={skills} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-4 text-white"
            >
              Experience
            </motion.h3>

            <div className="space-y-6">
              <TimelineItem
                title="WEB DEVELOPER INTERN"
                company="OctaNet Services Pvt Ltd"
                period="Mar 2024 – Apr 2024"
                description="Developed a fully functional e-commerce website. Integrated a secure payment gateway and enhanced UI/UX for better user retention."
              />
              <TimelineItem
                title="SDE INTERN"
                company="ThinkNext Technologies Pvt Ltd"
                period="Jun 2024 – Aug 2024"
                description="Built a real-time web application with WebSocket-based updates and Gemini AI integration for intelligent automation. Used React.js, Next.js, and Express.js with a focus on API security and performance optimization."
              />
            </div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-4 text-white"
            >
              Education
            </motion.h3>

            <div className="space-y-6">
              <TimelineItem
                title="Bachelor of Computer Science"
                company="HPTU"
                period="2022 - 2026"
                description="Focused on Programming and Software Development. Participated in multiple hackathons and coding competitions."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  title,
  company,
  period,
  description,
}: {
  title: string;
  company: string;
  period: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500" />
        <div className="w-0.5 h-full bg-zinc-800" />
      </div>
      <div className="pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <div className="px-3 py-1 bg-zinc-800 text-zinc-200 rounded-full text-sm">
            {company}
          </div>
        </div>
        <p className="text-sm text-zinc-400 mt-1">{period}</p>
        <p className="mt-2 text-zinc-300">{description}</p>
      </div>
    </motion.div>
  );
}
