import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connect } from "../../../db/dbConfig";
 import Project from "@/models/projectmodel";
import Portfolio from "@/models/portfoliomodel";
export async function POST(request: NextRequest) {
  await connect();

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }

  const body = await request.json();

  const {
    name,
    email,
    phone,
    github,
    linkedin,
    about,
    projects,
    skills,
    skillsDetailed,
    Education,
    Experience,
    role
  } = body;

  // Basic validation
  if (
    !name ||
    !email ||
    !phone ||
    !github ||
    !linkedin ||
    !about
  ) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  try {
    const project = await Portfolio.create({
      username:name,
      email,
      phoneno:phone,
      githublink:github,
      linkdienlink:linkedin,
      about,
      userid: userId,
      projects,
      skills,
      skillsDetailed,
      Education,
      Experience,
      role
    });

    return NextResponse.json(
      { message: "Project created successfully", project },
      { status: 201 }
    );
  } catch (error) {
    console.log("ads",error);
    
    return NextResponse.json(
      { message: "Error creating project", error: (error as any).message },
      { status: 500 }
    );
  }
}
