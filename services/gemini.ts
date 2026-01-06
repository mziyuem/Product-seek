
import { GoogleGenAI, Type } from "@google/genai";
import { Product, IdeationResult } from "../types";

// Always use named parameter for apiKey and use process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getIdeation(query: string): Promise<IdeationResult> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this product ideation request: "${query}". Provide a structured analysis of the market potential and directions.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          subDirections: { type: Type.ARRAY, items: { type: Type.STRING } },
          relatedProducts: { type: Type.ARRAY, items: { type: Type.STRING } },
          marketGaps: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedPaths: { type: Type.ARRAY, items: { type: Type.STRING } },
          insightSummary: { type: Type.STRING },
        },
        required: ["subDirections", "relatedProducts", "marketGaps", "suggestedPaths", "insightSummary"],
      },
    },
  });

  // Extract generated text directly from the response object
  const resultText = response.text || "{}";
  return JSON.parse(resultText);
}

export async function getProductAnalysis(product: Product, context: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are a product strategy expert. Analyze the following product data: 
    Name: ${product.name}
    Description: ${product.description}
    Metrics: ${JSON.stringify(product.metrics)}
    Domain: ${product.domain}
    
    Context of analysis: ${context}
    
    Provide a professional, strategic insight about this product in 2-3 concise paragraphs. Focus on differentiation and monetization potential.`,
  });

  // Use the .text property to get the generated content safely
  return response.text || "AI insight is currently unavailable.";
}

export async function compareProducts(products: Product[]): Promise<string> {
  const data = products.map(p => `${p.name}: ${p.description} (Metrics: ${JSON.stringify(p.metrics)})`).join("\n\n");
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Perform a side-by-side strategic comparison of the following products:\n\n${data}\n\nHighlight the unique value proposition (UVP) of each, common market challenges, and which product has the highest growth potential and why. Use professional strategy consulting tone.`,
  });

  // Use the .text property to get the generated content safely
  return response.text || "Comparison data is currently unavailable.";
}
