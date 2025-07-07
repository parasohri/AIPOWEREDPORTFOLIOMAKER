import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connect } from "../../../db/dbConfig";
 import Project from "@/models/projectmodel";
 
import Portfolio from "@/models/portfoliomodel";
 
export async function POST(request: NextRequest) {
  await connect();
console.log("Request received for data upload");

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
    role,selectedTemplate
  } = body;
console.log("Received data:", body);
  // Basic validation
  console.log("Validating required fields");
  console.log("name",body.data.name);
  console.log("email",body.data.email);
  console.log("phone",phone);
  console.log("github",github);
  console.log("linkedin",linkedin);
  console.log("about",about); 
  console.log("selectedTemplate",selectedTemplate);
  if (
    !body.data.name ||
    !body.data.email ||
    !body.data.phone ||
    !body.data.github ||
    !body.data.linkedin ||
    !body.data.about||
    !selectedTemplate
  ) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  try {
    const project = await Portfolio.create({
      username:body.data.name,
      email:body.data.email,
      phoneno:body.data.phone,
      githublink:body.data.github,
      linkdienlink:body.data.linkedin,
      about:body.data.about,
      userid: userId,
      projects:body.data.projects,
      skills:body.data.skills,
      skillsDetailed:body.data.skillsDetailed,
      Education:body.data.Education,
      Experience:body.data.Experience,
      role:body.data.role,template:selectedTemplate
    });
    console.log("Project created:", project);

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
