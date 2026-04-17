import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: Request) {
  try {
    const { question, userAnswer } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required in the request body" },
        { status: 400 }
      );
    }

    const systemPrompt = `
      You are a strict technical interviewer for a top-tier tech company. 
      Your goal is to evaluate the candidate's answer and provide professional, high-standard feedback.

      Evaluation Rules:
      1. If the candidate's answer is WRONG:
         - Clearly identify the mistake in the feedback.
         - Do NOT reveal the correct answer immediately in the 'hint' or 'improvedAnswer' fields.
         - Instead, guide them with a technical hint that encourages them to rethink their logic.
      
      2. If the candidate's answer is PARTIALLY CORRECT:
         - Appreciate the correct parts of their explanation.
         - Identify what is missing or slightly inaccurate.
         - Provide an 'improvedAnswer' that fills those gaps while maintaining their original structure where possible.

      3. If the candidate's answer is CORRECT:
         - Acknowledge their expertise.
         - Refine their answer in the 'improvedAnswer' field to make it more "interview-ready" (crisp, professional, and using precise technical terminology).

      Output Requirement (Always return this JSON structure):
      {
        "hint": "Technical guidance or correction nudge.",
        "improvedAnswer": "The refined, interview-ready version of the answer based on the evaluation above.",
        "keyPoints": ["3-5 critical technical keywords or concepts the candidate must mention."]
      }
      
      Tone: Strict, professional, and uncompromising on technical accuracy.
    `;

    const userPrompt = `
      Question: ${question}
      User's Current Answer: ${userAnswer || "No answer provided yet."}
      
      Provide a hint, an improved answer, and key points in JSON format.
    `;

    // Added safety check for API key
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        {
          hint: "Keep thinking about the core concepts of this topic!",
          improvedAnswer: "An AI improved answer will be available once the API key is configured.",
          keyPoints: ["Read the official documentation", "Practice coding the concept"]
        }
      );
    }

    const result = await model.generateContent([systemPrompt, userPrompt]);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown formatting from AI response
    const jsonString = text.replace(/```json\n?|```/g, "").trim();
    
    try {
      const parsed = JSON.parse(jsonString);
      return NextResponse.json(parsed);
    } catch (parseError) {
      console.error("Failed to parse AI response:", text);
      return NextResponse.json({
        hint: "Think about how this concept relates to memory and performance.",
        improvedAnswer: "A full improvement could not be generated at this moment.",
        keyPoints: ["Accuracy", "Clarity", "Performance"]
      });
    }

  } catch (error) {
    console.error("AI Hint API Error:", error);
    // Return a structured fallback so the UI handles it gracefully
    return NextResponse.json({
      hint: "AI service is momentarily unavailable. Re-read the question and focus on the fundamental concepts.",
      improvedAnswer: "Your answer is a great start. Focus on accuracy and technical clarity.",
      keyPoints: ["Read the official documentation", "Review core Java concepts"]
    });
  }
}
