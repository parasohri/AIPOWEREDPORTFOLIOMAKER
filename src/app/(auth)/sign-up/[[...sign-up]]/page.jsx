"use client"
import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const redirectUrl ="/Dashboard"; // fallback route

  return (
    <div className="flex justify-center mt-20">
      <SignUp redirectUrl={redirectUrl} />
    </div>
  );
}
