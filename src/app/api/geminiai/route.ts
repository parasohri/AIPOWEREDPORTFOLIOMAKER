// app/api/resume/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';
 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEYONE!); // Your API key

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.4,
  },
  systemInstruction: `You are an intelligent resume analyzer.

Instructions:
1. Extract all projects from the resume text.
2. Match relevant links (GitHub, live demo, YouTube) to each project.
3. For each project, return:
{
  "title": "Project Title",
  "description": "Project Description",
  "image": "/placeholder.svg?height=400&width=600",
  "category": "Project Category",
  "tags": [TECH STACK],
  "demoLink": "LIVE DEMO LINK",
  "githubLink": "GITHUB LINK"
}
Make sure demoLink and githubLink are correctly matched.

4. Generate an 'about' summary based on resume intro and experience.
5. Return 'skillsDetailed' as an array:
[
  {
    "icon": "Code",
    "color": "blue",
    "title": "Frontend",
    "description": "..."
  },
  ...
]
6. Return a 'skills' array like ["HTML", "MongoDB", "React"].
7. Return a 'Experience' as an array:[{
             "title":"WEB DEVELOPER INTERN"
                "company":"OctaNet Services Pvt Ltd"
                "period":"Mar 2024 – Apr 2024"
                "description":"...."

},
... ]
8. Return a 'Education' as an array:[{
                "title":"Bachelor of Computer Science"
                "company":"HPTU"
                "period":"2022 - 2026"
                "description":"..."
},..]
9. generate an 'role' acc. to it like  frontend developer etc 
Final output format:
{
  "about": "...",
  "projects": [...],
  "skillsDetailed": [...],
  "skills": [...],
  "Experience":[...],
  "Education":[...],
  "role":""
}`,
});

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("da");

  if (!prompt) {
    return NextResponse.json({ error: "Missing 'da' query param" }, { status: 400 });
  }

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return NextResponse.json(JSON.parse(response));
  } catch (err) {
    return NextResponse.json({ error: "Failed to process prompt", details: err }, { status: 500 });
  }
}
