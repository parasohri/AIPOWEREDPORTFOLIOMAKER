"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border";
import { MovingBorder } from "@/components/ui/moving-border";
import { AnimatedText } from "@/components/ui/animated-text";
 import { useEffect } from "react";
 import { useParams } from "next/navigation";
type Project = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
  image?: string;
};

export function ProjectsSection() {
  const categories = ["All", "Web", "UI/UX", "Backend"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
const params=useParams();
 useEffect(()=>{
 const fetchData = async () => {
    try { 
      const res = await fetch(`/api/fetchdata?id=${params.id}`);
      const result = await res.json();

      if (result?.project) {
        console.log("da",result.project.username);
        
        setProjects(result.project.projects)
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


 },[params.id])
   
  if(projects){const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);
  }
  return (
    <section id="projects" className="py-20 bg-zinc-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <AnimatedText
              text="My Projects"
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
            Here are some of my recent projects. Each one was carefully crafted
            to solve specific problems and showcase different skills and
            technologies.
          </motion.p>
        </div>

        {/* Categories */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
               
            </motion.div>
          ))}
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AnimatedGradientBorder
                borderWidth={2}
                gradientColors={["#6366f1", "#8b5cf6", "#d946ef", "#ec4899"]}
                className="h-full bg-zinc-900 p-1"
                containerClassName="h-full"
                borderRadius={16}
              >
                <div className="flex flex-col h-full bg-zinc-900 rounded-2xl overflow-hidden">
                  <div className="relative overflow-hidden aspect-video">
                    {/* <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    /> */}
                    <div className="absolute top-2 right-2 px-3 py-1 bg-black/70 backdrop-blur-sm text-xs rounded-full text-white">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-zinc-800 rounded-md text-xs text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between p-6 pt-0">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </div>
                </div>
              </AnimatedGradientBorder>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-12">
          <MovingBorder
            borderRadius="9999px"
            className="p-0.5"
            colors={["#6366f1", "#8b5cf6", "#d946ef", "#ec4899"]}
          >
            <button className="px-8 py-3 rounded-full bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors">
              View All Projects
            </button>
          </MovingBorder>
        </div>
      </div>
    </section>
  );
}