
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    classification: {
      type: Type.STRING,
      description: "Classify the headline as either 'Real' or 'Fake'.",
      enum: ['Real', 'Fake'],
    },
    confidence: {
      type: Type.NUMBER,
      description: "A confidence score from 0 to 100 on the classification.",
    },
    explanation: {
      type: Type.STRING,
      description: "A brief, one-sentence explanation for the classification, analyzing the headline's language, tone, and potential biases.",
    },
  },
  required: ['classification', 'confidence', 'explanation'],
};

export const analyzeHeadline = async (headline: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following news headline and determine if it is likely real or fake news. Consider factors like sensationalism, emotional language, and verifiability. Headline: "${headline}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText);
    
    // Basic validation to ensure the result matches the expected structure
    if (
      (parsedResult.classification === 'Real' || parsedResult.classification === 'Fake') &&
      typeof parsedResult.confidence === 'number' &&
      typeof parsedResult.explanation === 'string'
    ) {
      return parsedResult as AnalysisResult;
    } else {
      throw new Error("Invalid response structure from AI model.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Could not get a valid analysis from the AI model.");
  }
};
