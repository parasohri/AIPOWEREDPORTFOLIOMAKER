"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Front() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter();

  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size too large");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Step 1: Upload file and get parsed text
      const uploadRes = await fetch("/api/fileupload", {
        method: "POST",
        body: formData,
      });

      const { text, links } = await uploadRes.json();

      // Step 2: Send parsed text to Gemini AI
      const geminiRes = await fetch(
        `/api/geminiai?da=${encodeURIComponent(text)} ${links}`
      );
      const aiData = await geminiRes.json(); // { about, projects, skills }

      // Step 3: Store result
      localStorage.setItem("portfolioData", JSON.stringify(aiData));

      // Step 4: Redirect
      router.push("/Edit-portfolio");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleContinueWithoutUpload = () => {
    localStorage.setItem("portfolioData", JSON.stringify({}));
    // Show alert to inform user about manual data entry
    alert("Note: Portfolio generation works best when you upload a resume.");
    router.push("/Edit-portfolio");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6">
      <div className="bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-400">
          Upload Your Resume
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Resume File (DOCx)
            </label>
            <input
              type="file"
              accept=".docx"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFile(e.target.files?.[0] || null)
              }
              className="file-input file-input-bordered w-full bg-gray-800 border-gray-700 text-gray-200"
              required
            />
          </div>

          <button
            type="submit"
            className={`btn w-full bg-blue-600 hover:bg-blue-700 text-white transition-all ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Resume"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleContinueWithoutUpload}
            className="text-sm text-blue-400 hover:underline"
          >
             Add Data Manually
          </button>
        </div>

        {file && (
          <p className="text-sm text-gray-400 mt-4 truncate">
            Selected File: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Front;
