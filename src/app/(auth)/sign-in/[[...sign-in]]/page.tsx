"use client";

import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("/Dashboard");

  useEffect(() => {
    const po = localStorage.getItem("po");
    if (po == "1") {
      setRedirectUrl("/Publish");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center px-4">
      <div className="bg-zinc-800 text-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-400">Welcome</h1>
        <p className="text-center text-gray-400">
          Sign in to continue managing your portfolio or continue as a guest.
        </p>

        {/* Continue as Guest Button (on top) */}
        <button
          onClick={() => router.push("/Dashboard")}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors text-white py-2 px-4 rounded-md text-lg font-semibold shadow-md mb-4"
        >
          Continue as Guest
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <div className="flex-1 h-px bg-gray-600" />
          <span>OR</span>
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        {/* Clerk Sign In */}
        <div className="flex justify-center">
          <SignIn redirectUrl={localStorage.getItem("po") == "1" ? "/Publish" : "/Dashboard"} />
        </div>
      </div>
    </div>
  );
}
