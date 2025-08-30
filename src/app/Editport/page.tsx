"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Portfolio {
  _id: string;
  username: string;
  about: string;
  githublink: string;
  linkdienlink: string;
  template: string;
}

export default function ViewAllPortfolios() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      alert("Please sign in to view portfolios.");
      router.push("/sign-in");
      return;
    }

    const fetchPortfolios = async () => {
      try {
        const res = await fetch("/api/fetchportfolios");
        const data = await res.json();

        if (res.ok) {
          setPortfolios(data.project || []);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Error fetching portfolios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [isSignedIn]);

  if (loading) {
    return <div className="text-white p-6">Loading portfolios...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
          All Portfolios
        </h1>

        {portfolios.length === 0 ? (
          <p className="text-center text-gray-400">No portfolios found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {portfolios.map((portfolio) => {
              // Determine dynamic view link based on template
              let viewLink = `/portfolio/${portfolio._id}`;
              if (portfolio.template === "template-two") {
                viewLink = `/portfoliotwo/${portfolio._id}`;
              }  
              if (portfolio.template === "template-three") {
                viewLink = `/Portfoliothree/${portfolio._id}`;
              }

              return (
                <div
                  key={portfolio._id}
                  className="bg-zinc-900 border border-zinc-700 p-5 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold">{portfolio.username}</h2>
                  <p className="text-sm text-gray-400 mt-1 mb-2 line-clamp-2">{portfolio.about}</p>
                  <div className="flex gap-3 mt-4">
                    <Link
                      href={`/PortfolioEdit/${portfolio._id}`}
                      className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </Link>
                    <Link
                      href={viewLink}
                      className="text-sm border border-green-400 text-green-400 px-4 py-1 rounded hover:bg-green-600 hover:text-white transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
