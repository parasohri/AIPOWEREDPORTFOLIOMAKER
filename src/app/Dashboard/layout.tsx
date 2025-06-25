"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  useClerk,
  useUser,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  const handleLogoClick = () => router.push("/");

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      {/* Navbar */}
      <header className="bg-zinc-800 shadow-md w-full fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          {/* Left: Logo */}
          <div
            onClick={handleLogoClick}
            className="cursor-pointer text-xl font-bold text-blue-400"
          >
            Portfolio Builder
          </div>

          {/* Right: User Info */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              {isLoaded && user && (
                <>
                  {/* Avatar */}
               
                  
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-400">
                    <img
                      src={user.imageUrl}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Email */}
                  <div className="hidden sm:block text-sm font-medium truncate max-w-[160px]">
                    {user.emailAddresses[0]?.emailAddress}
                  </div>

                  {/* Sign Out */}
                  <button
                    onClick={() => signOut()}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    <LogOutIcon className="w-4 h-4 mr-1" />
                    Sign Out
                  </button>
                </>
              )}
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="btn btn-sm btn-primary">Sign In</button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className=" px-0 sm:px-6 lg:px-0 flex-grow max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
