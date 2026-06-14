"use client";

import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
//import { log } from "node:console";
import { useEffect, useState } from "react";
import { trackGuestContinue } from "@/lib/mixpanel.tracker";
export default function SignUpPage() {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("/Dashboard"); // safe default

  useEffect(() => {
    console.log("Checking localStorage for 'po' value...");
    // localStorage is only available client-side, so read it here
    if (localStorage.getItem("po") === "1") {
        console.log("'po' is 1, setting redirect to /Publish");
      setRedirectUrl("/Publish");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center px-4">
      <div className="bg-zinc-800 text-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-400">Welcome</h1>
        <p className="text-center text-gray-400">
          Sign up to start managing your portfolio or continue as a guest.
        </p>

        <button
          onClick={() =>
            trackGuestContinue("/Dashboard") ||
            router.push("/Dashboard")}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors text-white py-2 px-4 rounded-md text-lg font-semibold shadow-md mb-4"
        >
          Continue as Guest
        </button>

        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <div className="flex-1 h-px bg-gray-600" />
          <span>OR</span>
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        <div className="flex justify-center">
          <SignUp redirectUrl={redirectUrl} /> {/* ✅ uses state, never touches localStorage directly */}
        </div>
      </div>
    </div>
  );
}