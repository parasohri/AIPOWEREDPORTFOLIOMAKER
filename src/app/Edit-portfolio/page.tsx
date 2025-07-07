"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { auth } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
export default function EditPortfolioForm() {
  const router = useRouter();
  const { isSignedIn } = useUser();
// const {userId}=await auth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
const [email,setEmail]=useState("");
  const [about, setAbout] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [skillsDetailed, setSkillsDetailed] = useState<any[]>([]);
  const [skills, setSkills] = useState<string>("");
const [Experience,setExperience]=useState<any[]>([]);
const [Education,setEducation]=useState<any[]>([]);
const[role,setRole]=useState("");
  useEffect(() => {
    const stored = localStorage.getItem("portfolioData");
    if (stored) {
      const data = JSON.parse(stored);
      setEmail(data.email||"")
      setName(data.name || "");
      setPhone(data.phone || "");
      setLinkedin(data.linkedin || "");
      setGithub(data.github || "");
      setAbout(data.about || "");
      setProjects(data.projects || []);
      setSkillsDetailed(data.skillsDetailed || []);
      setSkills((data.skills || []).join(", "));
      setExperience(data.Experience||[]);
      setEducation(data.Education||[]);
      setRole(data.role||"");
    }
  }, []);
  const handleEducationChange = (index: number, field: string, value: string) => {
  const updated = [...Education];
  updated[index][field] = value;
  setEducation(updated);
};

const handleAddEducation = () => {
  setEducation([
    ...Education,
    {
      title: "",
      company: "",
      period: "",
      description: "",
    },
  ]);
};

const handleExperienceChange = (index: number, field: string, value: string) => {
  const updated = [...Experience];
  updated[index][field] = value;
  setExperience(updated);
};

const handleAddExperience = () => {
  setExperience([
    ...Experience,
    {
      title: "",
      company: "",
      period: "",
      description: "",
    },
  ]);
};

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updated = [...projects];
    if (field === "tags") {
      updated[index][field] = value.split(",").map((tag) => tag.trim());
    } else {
      updated[index][field] = value;
    }
    setProjects(updated);
  };

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        image: "",
        category: "",
        tags: [],
        demoLink: "",
        githubLink: "",
      },
    ]);
  };

  const handleSkillDetailChange = (index: number, field: string, value: string) => {
    const updated = [...skillsDetailed];
    updated[index][field] = value;
    setSkillsDetailed(updated);
  };

  const handleAddSkillDetail = () => {
    setSkillsDetailed([
      ...skillsDetailed,
      { icon: "", color: "", title: "", description: "" },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSave = {
      email,
      name,
      phone,
      linkedin,
      github,
      about,
      projects,
      skills: skills.split(",").map((s) => s.trim()),
      skillsDetailed,
      Education,
      Experience,
      role
     
    };

    localStorage.setItem("portfolioData",JSON.stringify(dataToSave));
    // if(userId){
      //hui to redirect krna /id pr or create krna mongose me data store krna isme experience krna add
    
    // try {
    //   const response = await fetch('/api/portfolio', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(dataToSave)
    //   });

    //   const result = await response.json();

    //   if (!response.ok) throw new Error(result.error || 'Something went wrong');

    //   alert("Portfolio saved successfully!");
    // } catch (error: any) {
    //   console.error("Error saving portfolio:", error);
    //   alert(error.message || "Failed to save portfolio");
    // }
    // }
    alert("Portfolio updated!");
    if (!isSignedIn) {
 
    }
    localStorage.setItem("po","1");
    router.push("/choosetemplate");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto space-y-8 bg-gray-900 p-8 rounded-xl border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center text-blue-400">
          Edit Portfolio
        </h1>

        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-4">
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm"
          />
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="LinkedIn URL"
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm"
          />
          <input
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="GitHub URL"
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm"
          />
        </div>

        {/* About */}
        <div>
          <label className="block mb-2 text-sm font-semibold">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm"
            required
          />
        </div>
        {/* role */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Role</label>
          <textarea
            value={role}
            onChange={(e) => setRole(e.target.value)}
            rows={4}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm"
            required
          />
        </div>

        {/* Projects Section */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Projects</label>
          {projects.map((proj, index) => (
            <div
              key={index}
              className="space-y-2 bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700"
            >
              <input
                type="text"
                placeholder="Title"
                value={proj.title}
                onChange={(e) =>
                  handleProjectChange(index, "title", e.target.value)
                }
                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
              />
              <textarea
                placeholder="Description"
                value={proj.description}
                onChange={(e) =>
                  handleProjectChange(index, "description", e.target.value)
                }
                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={proj.image}
                onChange={(e) =>
                  handleProjectChange(index, "image", e.target.value)
                }
                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
              />
              <input
                type="text"
                placeholder="Category"
                value={proj.category}
                onChange={(e) =>
                  handleProjectChange(index, "category", e.target.value)
                }
                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
              />
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={proj.tags.join(", ")}
                onChange={(e) =>
                  handleProjectChange(index, "tags", e.target.value)
                }
                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
              />
              <input
                type="text"
                placeholder="Demo Link"
                value={proj.demoLink}
                onChange={(e) =>
                  handleProjectChange(index, "demoLink", e.target.value)
                }
                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
              />
              <input
                type="text"
                placeholder="GitHub Link"
                value={proj.githubLink}
                onChange={(e) =>
                  handleProjectChange(index, "githubLink", e.target.value)
                }
                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProject}
            className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-sm"
          >
            + Add Project
          </button>
        </div>

        {/* Skills */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Skills</label>
          <input
            type="text"
            placeholder="Skills (comma-separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm"
          />
        </div>

        {/* Skills Detailed */}
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Skills Detailed
          </label>
          {skillsDetailed.map((skill, index) => (
            <div
              key={index}
              className="space-y-2 bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700"
            >
              <input
                type="text"
                placeholder="Icon (e.g., Code, Server)"
                value={skill.icon}
                onChange={(e) =>
                  handleSkillDetailChange(index, "icon", e.target.value)
                }
                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
              />
              <input
                type="text"
                placeholder="Color (e.g., blue, green)"
                value={skill.color}
                onChange={(e) =>
                  handleSkillDetailChange(index, "color", e.target.value)
                }
                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
              />
              <input
                type="text"
                placeholder="Title"
                value={skill.title}
                onChange={(e) =>
                  handleSkillDetailChange(index, "title", e.target.value)
                }
                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
              />
              <textarea
                placeholder="Description"
                value={skill.description}
                onChange={(e) =>
                  handleSkillDetailChange(index, "description", e.target.value)
                }
                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSkillDetail}
            className="mt-2 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 text-sm"
          >
            + Add Skill Detail
          </button>
        </div>
         
{/* Education Section */}
<div>
  <label className="block mb-2 text-sm font-semibold">Education</label>
  {Education.map((edu, index) => (
    <div
      key={index}
      className="space-y-2 bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700"
    >
      <input
        type="text"
        placeholder="Title"
        value={edu.title}
        onChange={(e) => handleEducationChange(index, "title", e.target.value)}
        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
      />
      <input
        type="text"
        placeholder="Institute/University"
        value={edu.company}
        onChange={(e) => handleEducationChange(index, "company", e.target.value)}
        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
      />
      <input
        type="text"
        placeholder="Period"
        value={edu.period}
        onChange={(e) => handleEducationChange(index, "period", e.target.value)}
        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
      />
      <textarea
        placeholder="Description (optional)"
        value={edu.description || ""}
        onChange={(e) => handleEducationChange(index, "description", e.target.value)}
        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
      />
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddEducation}
    className="mt-2 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 text-sm"
  >
    + Add Education
  </button>
</div>

{/* Experience Section */}
<div>
  <label className="block mb-2 text-sm font-semibold">Experience</label>
  {Experience.map((exp, index) => (
    <div
      key={index}
      className="space-y-2 bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700"
    >
      <input
        type="text"
        placeholder="Title"
        value={exp.title}
        onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
      />
      <input
        type="text"
        placeholder="Company/Organization"
        value={exp.company}
        onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
      />
      <input
        type="text"
        placeholder="Period"
        value={exp.period}
        onChange={(e) => handleExperienceChange(index, "period", e.target.value)}
        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
      />
      <textarea
        placeholder="Description (optional)"
        value={exp.description || ""}
        onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm"
      />
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddExperience}
    className="mt-2 px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700 text-sm"
  >
    + Add Experience
  </button>
</div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg text-white font-semibold"
        >
          Save Portfolio
        </button>
      </form>
    </div>
  );
}
