
import { GoogleGenAI, Type } from '@google/genai';
import type { FarmingAdvice } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    weather_summary: {
      type: Type.STRING,
      description: "A brief, one-paragraph summary of the likely weather conditions for the described region and season. Mention temperature ranges, rainfall expectations, and humidity."
    },
    crop_suggestions: {
      type: Type.ARRAY,
      description: "A list of 3 to 5 suitable crop suggestions.",
      items: {
        type: Type.OBJECT,
        required: ["name", "sowing_season", "water_requirements", "soil_suitability", "potential_yield", "common_pests_diseases"],
        properties: {
          name: {
            type: Type.STRING,
            description: "The name of the crop."
          },
          sowing_season: {
            type: Type.STRING,
            description: "The best time/season to sow this crop."
          },
          water_requirements: {
            type: Type.STRING,
            description: "Description of the crop's water needs (e.g., low, medium, high, drought-resistant)."
          },
          soil_suitability: {
            type: Type.STRING,
            description: "The type of soil best suited for this crop (e.g., loamy, sandy, clay)."
          },
          potential_yield: {
            type: Type.STRING,
            description: "An estimated potential yield per acre or hectare."
          },
          common_pests_diseases: {
            type: Type.STRING,
            description: "A brief list of common pests or diseases that affect this crop."
          }
        }
      }
    }
  },
  required: ["weather_summary", "crop_suggestions"]
};


export const getFarmingAdvice = async (query: string): Promise<FarmingAdvice> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following query, provide farming advice: "${query}"`,
      config: {
        systemInstruction: "You are an expert agricultural advisor for Indian farmers. Provide concise, practical, and actionable advice. Your response must be in JSON format conforming to the provided schema.",
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text.trim();
    // Sometimes the model might wrap the JSON in markdown backticks
    const cleanJsonText = text.replace(/^```json\s*|```\s*$/g, '');
    const parsedData = JSON.parse(cleanJsonText);
    
    if (!parsedData.weather_summary || !parsedData.crop_suggestions) {
        throw new Error("Received malformed data from API.");
    }
    
    return parsedData as FarmingAdvice;
  } catch (error) {
    console.error("Error fetching farming advice from Gemini API:", error);
    throw new Error("Failed to get farming advice. Please check your query or API key.");
  }
};
