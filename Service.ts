
import { GoogleGenAI } from "@google/genai";

// The API key is expected to be available in the environment variables.
// In a real application, this would be configured in the build process.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set process.env.API_KEY.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateDescription = async (origin: string, destination: string): Promise<string> => {
  if (!API_KEY) {
    return "AI service is not configured. Please add your own description.";
  }

  try {
    const prompt = `Generate a friendly and short carpool ride description for a trip from "${origin}" to "${destination}" in Pune. Mention it's a great way to commute for MIT-WPU students. Keep it under 200 characters.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    return "Could not generate AI description. Please write your own.";
  }
};
