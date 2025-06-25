"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Edit, List, Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { isSignedIn } = useUser();
  const router = useRouter();
   
  const handleProtectedRoute = (e: React.MouseEvent, href: string) => {
    if (!isSignedIn) {
      e.preventDefault(); // Stop navigation
      alert("Please sign in to access this feature.");
    } else {
      router.push(href);
    }
  };

  const links = [
    {
      href: "/Front",
      icon: <Plus className="w-6 h-6 text-blue-400" />,
      title: "Create Portfolio",
      description: "Start building a new developer portfolio from scratch.",
      protected: false,
    },
    {
      href: "/Editport",
      icon: <Edit className="w-6 h-6 text-green-400" />,
      title: "Edit Portfolio",
      description: "Update and manage your existing portfolio data.",
      protected: true,
    },
    {
      href: "/view-portfolio",
      icon: <List className="w-6 h-6 text-purple-400" />,
      title: "View Portfolios",
      description: "See a list of all saved portfolios with preview options.",
      protected: true,
    },
    {
      href: "http://parasohriresume.vercel.app/",
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      title: "Sample Portfolio",
      description: "Explore a sample portfolio as an example layout.",
      protected: false,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-0">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
         .......
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {links.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="border border-zinc-700 p-6 rounded-lg hover:bg-zinc-900 transition duration-300"
            >
              {link.protected ? (
                <button
                  onClick={(e) => handleProtectedRoute(e, link.href)}
                  className="block w-full text-left space-y-4"
                >
                  <div className="flex items-center gap-4">
                    {link.icon}
                    <h2 className="text-xl font-semibold">{link.title}</h2>
                  </div>
                  <p className="text-zinc-400 text-sm">{link.description}</p>
                </button>
              ) : (
                <Link href={link.href} className="block space-y-4">
                  <div className="flex items-center gap-4">
                    {link.icon}
                    <h2 className="text-xl font-semibold">{link.title}</h2>
                  </div>
                  <p className="text-zinc-400 text-sm">{link.description}</p>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
