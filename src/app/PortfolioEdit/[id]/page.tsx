"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdatePortfolioForm() {
  const router = useRouter();
  const params = useParams();
  const portfolioId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phoneno: "",
    linkdienlink: "",
    githublink: "",
    about: "",
    role: "",
    projects: [],
    skills: "",
    skillsDetailed: [],
    Education: [],
    Experience: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/fetchdata?id=${portfolioId}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            ...data.project,
            skills: data.project.skills?.join(", ") || "",
          });
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      } finally {
        setLoading(false);
      }
    };

    if (portfolioId) fetchData();
  }, [portfolioId]);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayChange = (
    index: number,
    field: string,
    value: any,
    key: string
  ) => {
    const updated = [...(formData as any)[key]];
    updated[index][field] = value;
    setFormData({ ...formData, [key]: updated });
  };

  const handleAddItem = (key: string, emptyObj: object) => {
    const updated = [...(formData as any)[key]];
    updated.push(emptyObj);
    setFormData({ ...formData, [key]: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
        projects: formData.projects.map((proj: any) => ({
          ...proj,
          tags: Array.isArray(proj.tags)
            ? proj.tags.map((tag: string) => tag.trim())
            : typeof proj.tags === "string"
            ? proj.tags.split(",").map((tag:String) => tag.trim())
            : [],
        })),
      };

      const res = await fetch("/api/updatedata", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: portfolioId, updated }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Portfolio updated successfully");
        router.push("/Dashboard");
      } else {
        alert(result.message || "Failed to update");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-4 bg-zinc-900 text-white rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-blue-400">
        Update Portfolio
      </h2>

      {/* Basic Info */}
      <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="Email" className="w-full p-2 bg-zinc-800 rounded" required />
      <input type="text" value={formData.username} onChange={(e) => handleChange("username", e.target.value)} placeholder="Username" className="w-full p-2 bg-zinc-800 rounded" required />
      <input type="text" value={formData.phoneno} onChange={(e) => handleChange("phoneno", e.target.value)} placeholder="Phone" className="w-full p-2 bg-zinc-800 rounded" required />
      <input type="url" value={formData.linkdienlink} onChange={(e) => handleChange("linkdienlink", e.target.value)} placeholder="LinkedIn URL" className="w-full p-2 bg-zinc-800 rounded" />
      <input type="url" value={formData.githublink} onChange={(e) => handleChange("githublink", e.target.value)} placeholder="GitHub URL" className="w-full p-2 bg-zinc-800 rounded" />
      <textarea value={formData.about} onChange={(e) => handleChange("about", e.target.value)} placeholder="About" className="w-full p-2 bg-zinc-800 rounded" rows={3} />
      <textarea value={formData.role} onChange={(e) => handleChange("role", e.target.value)} placeholder="Role" className="w-full p-2 bg-zinc-800 rounded" rows={2} />
      <input type="text" value={formData.skills} onChange={(e) => handleChange("skills", e.target.value)} placeholder="Skills (comma-separated)" className="w-full p-2 bg-zinc-800 rounded" />

      {/* Projects Section */}
      <div>
        <h3 className="text-lg font-semibold text-purple-400">Projects</h3>
        {formData.projects.map((proj: any, i: number) => (
          <div key={i} className="bg-zinc-800 p-3 rounded mb-2 space-y-2">
            {["title", "description", "demoLink", "githubLink"].map((field) => (
              <input
                key={field}
                type="text"
                value={proj[field]}
                onChange={(e) => handleArrayChange(i, field, e.target.value, "projects")}
                placeholder={field}
                className="w-full p-2 bg-zinc-900 rounded"
              />
            ))}
            <input
              type="text"
              value={Array.isArray(proj.tags) ? proj.tags.join(", ") : ""}
              onChange={(e) => handleArrayChange(i, "tags", e.target.value, "projects")}
              placeholder="Tags (comma-separated)"
              className="w-full p-2 bg-zinc-900 rounded"
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddItem("projects", { title: "", description: "", demoLink: "", githubLink: "", tags: [] })} className="text-sm text-blue-400">+ Add Project</button>
      </div>

      {/* Skills Detailed */}
      <div>
        <h3 className="text-lg font-semibold text-purple-400">Skills Detailed</h3>
        {formData.skillsDetailed.map((skill: any, i: number) => (
          <div key={i} className="bg-zinc-800 p-3 rounded mb-2 space-y-2">
            {["icon", "color", "title", "description"].map((field) => (
              <input
                key={field}
                type="text"
                value={skill[field]}
                onChange={(e) => handleArrayChange(i, field, e.target.value, "skillsDetailed")}
                placeholder={field}
                className="w-full p-2 bg-zinc-900 rounded"
              />
            ))}
          </div>
        ))}
        <button type="button" onClick={() => handleAddItem("skillsDetailed", { icon: "", color: "", title: "", description: "" })} className="text-sm text-blue-400">+ Add Skill Detail</button>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-lg font-semibold text-purple-400">Education</h3>
        {formData.Education.map((edu: any, i: number) => (
          <div key={i} className="bg-zinc-800 p-3 rounded mb-2 space-y-2">
            {["title", "company", "description", "period"].map((field) => (
              <input
                key={field}
                type="text"
                value={edu[field]}
                onChange={(e) => handleArrayChange(i, field, e.target.value, "Education")}
                placeholder={field}
                className="w-full p-2 bg-zinc-900 rounded"
              />
            ))}
          </div>
        ))}
        <button type="button" onClick={() => handleAddItem("Education", { title: "", company: "", description: "", period: "" })} className="text-sm text-blue-400">+ Add Education</button>
      </div>

      {/* Experience */}
      <div>
        <h3 className="text-lg font-semibold text-purple-400">Experience</h3>
        {formData.Experience.map((exp: any, i: number) => (
          <div key={i} className="bg-zinc-800 p-3 rounded mb-2 space-y-2">
            {["title", "company", "description", "period"].map((field) => (
              <input
                key={field}
                type="text"
                value={exp[field]}
                onChange={(e) => handleArrayChange(i, field, e.target.value, "Experience")}
                placeholder={field}
                className="w-full p-2 bg-zinc-900 rounded"
              />
            ))}
          </div>
        ))}
        <button type="button" onClick={() => handleAddItem("Experience", { title: "", company: "", description: "", period: "" })} className="text-sm text-blue-400">+ Add Experience</button>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 p-2 rounded text-white font-semibold"
      >
        Save Changes
      </button>
    </form>
  );
}
