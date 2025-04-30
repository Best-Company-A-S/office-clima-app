import { GoogleGenAI } from "@google/genai";

// Initialize the Google Gen AI SDK
export const ai = new GoogleGenAI(process.env.GEMINI_API_KEY || "");

// Helper to get the model
export const getGeminiModel = (modelName = "gemini-2.0-flash") => {
  return ai.generativeModels.getGenerativeModel({ model: modelName });
};

// Function calling helpers
export const functionCallingConfig = {
  tools: [],
  toolConfig: {
    functionCallingConfig: {
      mode: "any", // 'auto', 'any', or 'none'
    },
  },
};

// Add function declarations to the config
export const addFunctionDeclarations = (declarations: any[]) => {
  return {
    ...functionCallingConfig,
    tools: [
      {
        functionDeclarations: declarations,
      },
    ],
  };
};
