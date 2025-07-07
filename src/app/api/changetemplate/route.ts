 import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/dbConfig";
import Portfolio from "@/models/portfoliomodel";
import { auth } from "@clerk/nextjs/server";
 
 

export async function PUT(req: NextRequest) {
  await connect();

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id,template} = body;

    if (!id) {
      return NextResponse.json({ message: "Portfolio ID is required" }, { status: 400 });
    }
console.log("Updating portfolio with ID:", template);

    // Ensure only the owner can update
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { _id: id, userid: userId },
        { template: template },
      { new: true }
    );
console.log("Updated portfolio:", updatedPortfolio);
    if (!updatedPortfolio) {
      return NextResponse.json({ message: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Portfolio updated successfully",
      portfolio: updatedPortfolio,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Update failed",
      error: (error as any).message,
    }, { status: 500 });
  }
}
