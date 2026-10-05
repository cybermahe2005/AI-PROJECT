import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debug check
console.log(
  "GEMINI API KEY LOADED:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

// Gemini client (NEW SDK)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("Gemini AI Backend is running");
});

// API: Generate Web Template
app.post("/api/generate-template", async (req, res) => {
  try {
    const { websiteType, style, features } = req.body;

    console.log("Incoming request body:", req.body);

    // Validation
    if (!websiteType || !style || !features) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const prompt = `
You are an expert web UI/UX designer.

Based on the following requirements, suggest a professional webpage template.

Website Type: ${websiteType}
Design Style: ${style}
Required Features: ${features}

Respond clearly with:
1. Template Name
2. Page Sections
3. Layout Description
4. Color Scheme
5. Font Suggestions
`;

    // Gemini API call (NEW STYLE)
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    res.status(200).json({
      success: true,
      result: response.text,
    });

  } catch (error) {
    console.error("❌ Gemini API Error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to generate template using Gemini AI",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
