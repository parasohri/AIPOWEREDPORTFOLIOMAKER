"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const PublishPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    setLoading(true);

    const rawData = localStorage.getItem("portfolioData");
    const selectedTemplate = localStorage.getItem("selectedTemplate");

    if (!selectedTemplate) {
      alert("Please select a template before publishing.");
      setLoading(false);
      return;
    }

    if (!rawData) {
      alert("No data found in localStorage!");
      setLoading(false);
      return;
    }

    let data;
    try {
      data = JSON.parse(rawData);
    } catch (error) {
      console.error("Invalid JSON in localStorage");
      alert("Portfolio data is corrupted. Please re-enter.");
      setLoading(false);
      return;
    }

    try {
      localStorage.setItem("po", "2");

      const response = await fetch("/api/dataupload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
          selectedTemplate, // this is a string like "modern-dark"
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("🎉 Portfolio published successfully!");
        router.push("/view-portfolio");
      } else {
        alert("Failed to publish: " + result.error);
      }
    } catch (error) {
      console.error("Publish failed:", error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white px-4">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-400">
          Publish Portfolio
        </h1>
        <p className="text-sm text-gray-300 text-center">
          Make your portfolio public and showcase your work to the world.
        </p>
        <button
          onClick={handlePublish}
          disabled={loading}
          className={`w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium py-2 px-4 rounded flex justify-center items-center gap-2 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Publishing...
            </>
          ) : (
            <>🚀 Publish Now</>
          )}
        </button>
      </div>
    </div>
  );
};

export default PublishPage;
