 import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisResult } from "../types";

// Initialize Gemini client with API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeHeadline(headline: string): Promise<AnalysisResult> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  You are a fact-checking AI.
  Analyze the following news headline and decide whether it's likely real or fake.
  Respond in this JSON format:
  {
    "verdict": "Real" or "Fake",
    "confidence": "High" | "Medium" | "Low",
    "explanation": "A short, clear reason for your conclusion."
  }

  Headline: "${headline}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Try to parse JSON output (since we asked in JSON format)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      verdict: "Unknown",
      confidence: "Low",
      explanation: "Could not parse AI output."
    };

    return parsed as AnalysisResult;

  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      verdict: "Error",
      confidence: "Low",
      explanation: "Failed to analyze headline due to API error."
    };
  }
}
