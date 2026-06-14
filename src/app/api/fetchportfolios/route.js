import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../db/dbConfig";
import Project from "@/models/projectmodel";
import Portfolio from "@/models/portfoliomodel";
import Schedular from "@/models/scheduler";
import { auth } from "@clerk/nextjs/server";
import cron from "node-cron";
import {rotateSchedule} from "../../../utils/rotateschedular.js";
export async function GET(request) {
  await connect();
const { userId } = await auth();
rotateSchedule(userId);
  try {
    const schedular=await Schedular.findOne({userid:userId})
    const result = await Portfolio.find({userid:userId});
 
    if (!result) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
 



const ordered=schedular.order.map((id)=>result.find((p)=>p._id.toString()===id))
 
 
console.log("o",ordered);

    return NextResponse.json(
      { message: "Project fetched successfully", project: ordered},
      { status: 200 }
    ); 
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { message: "Error fetching project", error: (error).message },
      { status: 500 }
    );
  }
}
