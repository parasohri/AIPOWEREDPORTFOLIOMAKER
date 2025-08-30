"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Portfolio {
  _id: string;
  username: string;
  about: string;
  githublink: string;
  linkdienlink: string;
  template: string;
}

export default function ViewPortfolio() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    // Get origin only on client
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await fetch("/api/fetchportfolios");
        const data = await res.json();

        if (res.ok) {
          setPortfolios(data.project);
        } else {
          console.warn(data.message);
        }
      } catch (err) {
        console.error("Error fetching portfolios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [isSignedIn, router]);

  if (loading) return <div className="text-white p-6">Loading portfolios...</div>;

  // ✅ helper to generate portfolio URL correctly
  const getPortfolioUrl = (portfolio: Portfolio) => {
    if (portfolio.template === "template-two") {
      return `${origin}/portfoliotwo/${portfolio._id}`;
    } else if (portfolio.template === "template-three") {
      return `${origin}/portfoliothree/${portfolio._id}`;
    }
    return `${origin}/portfolio/${portfolio._id}`;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Go to Dashboard Button */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-400">Your Portfolios</h1>
          <Link
            href="/Dashboard"
            className="text-sm px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition font-medium"
          >
            Go to Dashboard
          </Link>
        </div>

        {portfolios.length === 0 ? (
          <p className="text-gray-400 text-center">No portfolios found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {portfolios.map((portfolio) => {
              const portfolioUrl = getPortfolioUrl(portfolio);

              return (
                <div
                  key={portfolio._id}
                  className="bg-zinc-900 border border-zinc-700 p-5 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold text-white">
                    {portfolio.username}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1 mb-2 line-clamp-2">
                    {portfolio.about}
                  </p>
                  <div className="text-sm text-blue-400 space-x-3">
                    {portfolio.githublink && (
                      <a
                        href={portfolio.githublink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {portfolio.linkdienlink && (
                      <a
                        href={portfolio.linkdienlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>

                  <Link
                    href={
                      portfolio.template === "template-two"
                        ? `/portfoliotwo/${portfolio._id}`
                        : portfolio.template === "template-three"
                        ? `/Portfoliothree/${portfolio._id}`
                        : `/portfolio/${portfolio._id}`
                    }
                    className="inline-block mt-4 text-sm text-green-400 hover:underline"
                  >
                    View Full Portfolio →
                  </Link>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(portfolioUrl);
                      alert("Portfolio link copied to clipboard!");
                    }}
                    className="mt-2 inline-block text-sm text-blue-300 hover:text-white border border-blue-500 px-3 py-1 rounded transition duration-200"
                  >
                    Copy your portfolio Link
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
