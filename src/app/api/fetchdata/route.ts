import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../db/dbConfig";
import Project from "@/models/projectmodel";
import Portfolio from "@/models/portfoliomodel";
export async function GET(request: NextRequest) {
  await connect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Missing project ID" }, { status: 400 });
  }

  try {
    const result = await Portfolio.findById(id);

    if (!result) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
console.log("da",result);

    return NextResponse.json(
      { message: "Project fetched successfully", project: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { message: "Error fetching project", error: (error as any).message },
      { status: 500 }
    );
  }
}
