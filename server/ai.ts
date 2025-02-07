import { VertexAI } from "@google-cloud/vertexai";
import type { AgentMetrics, Analysis, Trade } from "./models/schema.ts";
//import './init.ts'; // Initialize Firebase first


// Initialize Vertex AI
const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT_ID || '',
  location: 'us-central1',
});
const model = 'gemini-1.5-pro-002';

export interface MarketAnalysis {
  sentiment: number;
  confidence: number;
  recommendation: "buy" | "sell" | "hold";
  amount: number;
  reasoning: string;
  price: number;
}

interface AnalysisContext {
  topAgents: AgentMetrics[];
  historicalAnalysis: Analysis[];
  allActions: Trade[];
}

export async function analyzeMarket(
  tokenSymbol: string,
  context: AnalysisContext
): Promise<MarketAnalysis> {
  try {
    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: model,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.4,
      },
    });

    const prompt = `Analyze the FART token market data:
Top agents data: ${JSON.stringify(context.topAgents)}
Historical analysis: ${JSON.stringify(context.historicalAnalysis)}
Trading Actions: ${JSON.stringify(context.allActions)}

Provide a market analysis with the following JSON structure:
{
  "sentiment": number between 0-1,
  "confidence": number between 0-1,
  "recommendation": "buy" | "sell" | "hold",
  "amount": number between 0-100000,
  "reasoning": string explaining the analysis
  
}`;

    const result = await generativeModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    if (!result.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response from AI model");
    }

    const textResult = result.response.candidates[0].content.parts[0].text;
    const analysis = JSON.parse(textResult);

    return {
      sentiment: analysis.sentiment || 0.5,
      confidence: analysis.confidence || 0.5,
      recommendation: analysis.recommendation || "hold",
      amount: analysis.amount || 0,
      price: analysis.price || 0,
      reasoning: analysis.reasoning || "Analysis failed to provide reasoning"
    };
  } catch (error) {
    console.error("AI analysis failed:", error);
    return {
      sentiment: 0.5,
      confidence: 0.5,
      recommendation: "hold",
      amount:  0,
      price: 0,
      reasoning: "Analysis failed, defaulting to neutral position"
    };
  }
}