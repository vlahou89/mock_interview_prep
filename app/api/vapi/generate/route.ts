import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const { type, role, level, techstack, amount, userid } =
      await request.json();

    // Validate inputs
    if (!role || !level || !techstack || !amount || !userid) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate interview questions
    const { text: questionsText } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `
Prepare questions for a job interview.
The job role is ${role}.
The job experience level is ${level}.
The tech stack used in the job is: ${techstack}.
The focus between behavioural and technical questions should lean towards: ${type}.
The amount of questions required is: ${amount}.
Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant, so do not use "/" or "*" or any other special characters which might break the voice assistant.
Return the questions formatted like this:
["Question 1", "Question 2", "Question 3"]
`,
    });

    // Parse questions safely
    let questions: string[];
    try {
      questions = JSON.parse(questionsText);
      if (!Array.isArray(questions)) throw new Error("Invalid format");
    } catch (parseError) {
      console.error("Parsing error:", parseError);
      return Response.json(
        { success: false, error: "Failed to parse questions from AI" },
        { status: 500 }
      );
    }

    // Create interview object
    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(",").map((t: string) => t.trim()),
      questions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true, interview }, { status: 200 });
  } catch (error: any) {
    console.error("Error generating interview questions:", error);
    return Response.json(
      { success: false, error: error.message || error },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json(
    { success: true, data: "API is live!" },
    { status: 200 }
  );
}
