"use client";

import { motion } from "framer-motion";
import { Code, Database, Globe, Laptop, Palette, Server, Brain } from "lucide-react";
import { CardHoverEffect } from "@/components/ui/card-hover-effect";
import { AnimatedText } from "@/components/ui/animated-text";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export function AboutSection() {
  const [about, setAbout] = useState("");
const [skills,setSkills]=useState([]);

const params=useParams();
type TimelineEntry = {
  title: string;
  company: string;
  period: string;
  description?: string;
};
const [Experience, setExperience] = useState<TimelineEntry[]>([]);
const [Education, setEducation] = useState<TimelineEntry[]>([]);
  useEffect(() => {const fetchData = async () => {
    try { 
      const res = await fetch(`/api/fetchdata?id=${params.id}`);
      const result = await res.json();

      if (result?.project) {
         
        
         setAbout(result.project.about);
         setSkills(result.project.skillsDetailed)
         setEducation(result.project.Education);
         setExperience(result.project.Experience)
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
    
    
  }, []);

  

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
            {about || "Loading..."}
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
             {Experience && Experience.map((ex, idx) => (
  <TimelineItem
    key={idx}
    title={ex.title}
    company={ex.company}
    period={ex.period}
    description={ex.description || ""}
  />
))}

              
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
             {Education && Education.map((edu, idx) => (
  <TimelineItem
    key={idx}
    title={edu.title}
    company={edu.company}
    period={edu.period}
    description={edu.description || ""}
  />
))}

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
