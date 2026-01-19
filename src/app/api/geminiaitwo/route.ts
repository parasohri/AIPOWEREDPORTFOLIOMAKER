// app/api/resume/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEYTWO!); // Your API key

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.4,
  },
  systemInstruction: `
    You are an intelligent assistant embedded in a personal portfolio website.
    You will ONLY use the provided user information to answer any question asked by the visitor.
    Never hallucinate or assume information. If something is not mentioned, politely respond that it's not available.
    Be professional and concise in your responses.
  `,
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { userData, question } = await req.json();

  if (!userData || !question) {
    return NextResponse.json({ error: "Missing 'userData' or 'question'" }, { status: 400 });
  }
  console.log("Received userData:", userData);
  

  const fullPrompt = `
    USERDATA:
    ${userData}

    QUESTION:
    ${question}
  `;

  try {
    console.log("Full prompt sent to AI:", fullPrompt);
    const result = await model.generateContent(fullPrompt);
    console.log("AI response:", result.response.text());
    
    const responseText = result.response.text();

    return NextResponse.json({ answer: responseText });
  } catch (err) {
    return NextResponse.json({ error: "Failed to generate response", details: err }, { status: 500 });
  }
}
