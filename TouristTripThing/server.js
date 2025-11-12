// server.js
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, context } = req.body;

    const userContext = `
You are a tourism assistant for Uttarakhand, India.
Use this user context to personalize your answers.

Destination: ${context?.destination || "N/A"}
Trip Type: ${context?.type || "N/A"}
Budget: ${context?.budget || "N/A"}
Duration: ${context?.duration || "N/A"}

Always reply like a friendly travel planner.
Include local experiences, food, and safety tips when relevant.
`;

    const prompt = `${userContext}\nUser says: ${message}`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "AI request failed." });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
