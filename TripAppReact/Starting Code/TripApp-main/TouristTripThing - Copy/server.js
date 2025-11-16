import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// =================== LOCAL PLACE DATA ===================
const localPlaces = {
  Dehradun: [
    {
      name: "Robber's Cave (Guchhupani)",
      description: "A natural cave formation where a river flows through — perfect for adventure lovers.",
      images: [
        "https://images.unsplash.com/photo-1617814198890-88b1ebf43c44?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1622925091532-1e6924c2a90b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1632687248589-268e2e1d0020?auto=format&fit=crop&w=900&q=80"
      ],
      bestTime: "March – June",
      entryFee: "₹25",
      timing: "7 AM – 6 PM",
      location: "Guchhupani, Malsi, Dehradun",
      activities: ["Cave walk", "Nature photography"]
    },
    {
      name: "Sahastradhara",
      description: "Known for its sulphur springs and waterfalls, offering scenic beauty and therapeutic benefits.",
      images: [
        "https://images.unsplash.com/photo-1625049109689-3fa7db01a46f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=900&q=80"
      ],
      bestTime: "February – June",
      entryFee: "Free",
      timing: "7 AM – 7 PM",
      location: "Sahastradhara Road, Dehradun",
      activities: ["Bathing", "Ropeway ride", "Picnic"]
    },
    {
      name: "Mindrolling Monastery",
      description: "One of India’s largest Buddhist centers, featuring a 60m stupa and serene gardens.",
      images: [
        "https://images.unsplash.com/photo-1624024993531-fc40f334d23f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1636629342884-7b994747f48d?auto=format&fit=crop&w=900&q=80"
      ],
      bestTime: "All year",
      entryFee: "Free",
      timing: "9 AM – 7 PM",
      location: "Clement Town, Dehradun",
      activities: ["Meditation", "Cultural tour"]
    }
  ],

  Rishikesh: [
    {
      name: "Lakshman Jhula",
      description: "Iconic suspension bridge across the Ganga River with stunning views.",
      images: [
        "https://images.unsplash.com/photo-1608897013039-59e9e1e1fdbf?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1608877908955-3d439a2e778a?auto=format&fit=crop&w=900&q=80"
      ],
      bestTime: "October – March",
      entryFee: "Free",
      timing: "Open 24 hours",
      location: "Tapovan, Rishikesh",
      activities: ["Photography", "Sightseeing"]
    },
    {
      name: "Neer Garh Waterfall",
      description: "Hidden gem with turquoise pools — perfect for trekking and nature photography.",
      images: [
        "https://images.unsplash.com/photo-1617711426155-3e5c8ee806d1?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1605733160314-4f2b6fc9e2f1?auto=format&fit=crop&w=900&q=80"
      ],
      bestTime: "March – June",
      entryFee: "₹30",
      timing: "8 AM – 6 PM",
      location: "Neer Village, 3 km from Laxman Jhula",
      activities: ["Trekking", "Photography"]
    },
    {
      name: "Triveni Ghat",
      description: "Spiritual heart of Rishikesh — known for its serene Ganga Aarti ceremony.",
      images: [
        "https://images.unsplash.com/photo-1618172197460-c4bb65450f9e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1631190115372-6bfcdd4f67e1?auto=format&fit=crop&w=900&q=80"
      ],
      bestTime: "All year",
      entryFee: "Free",
      timing: "4 AM – 10 PM",
      location: "Triveni Ghat, Rishikesh",
      activities: ["Aarti Ceremony", "Meditation"]
    }
  ],

  Nainital: [
    {
      name: "Naini Lake",
      description: "The heart of Nainital — surrounded by hills, perfect for a scenic boat ride.",
      images: [

      ],
      bestTime: "March – October",
      entryFee: "₹100 (boating)",
      timing: "6 AM – 6 PM",
      location: "Mallital, Nainital",
      activities: ["Boating", "Sightseeing"]
    },
    {
      name: "Tiffin Top",
      description: "A 360° viewpoint of the Nainital valley — ideal for nature lovers and photographers.",
      images: [
        "https://images.unsplash.com/photo-1616309663199-2cb4e34f64b5?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1615919966212-5737de8304b9?auto=format&fit=crop&w=900&q=80"
      ],
      bestTime: "October – June",
      entryFee: "Free",
      timing: "6 AM – 5 PM",
      location: "Ayarpatta Hill, Nainital",
      activities: ["Hiking", "Photography"]
    }
  ]
};

// =================== CHAT API ===================
app.post("/api/chat", async (req, res) => {
  try {
    const { message, context } = req.body;
    const prompt = `
You are a friendly AI travel assistant for Uttarakhand.
Destination: ${context?.destination}
Trip Type: ${context?.type}
Budget: ${context?.budget}
Duration: ${context?.duration}
User says: ${message}
Respond conversationally and briefly.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a reply.";
    res.json({ reply });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to reach Gemini." });
  }
});

// =================== TOURIST PLACES API ===================
app.post("/api/generatePlaces", async (req, res) => {
  try {
    const { destination } = req.body;

    // Use local data instantly
    if (localPlaces[destination]) {
      console.log(`✅ Showing local tourist data for ${destination}`);
      return res.json(localPlaces[destination]);
    }

    // If it's a new destination, use Gemini + Unsplash
    const geminiPrompt = `
    Generate a list of 4 tourist places in ${destination}, Uttarakhand.
    For each place, include:
    - name
    - short 1-line description
    - bestTime
    - entryFee
    - timing
    - location
    Respond in valid JSON array format.`;

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: geminiPrompt }] }],
        }),
      }
    );

    const result = await geminiResponse.json();
    let text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // Clean Gemini output
    const jsonMatch = text.match(/\[([\s\S]*)\]/);
    const parsedPlaces = JSON.parse(jsonMatch ? jsonMatch[0] : "[]");

    // Fetch real photos
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (unsplashAccessKey) {
      for (const place of parsedPlaces) {
        const query = encodeURIComponent(`${place.name} ${destination}`);
        const photoRes = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashAccessKey}&per_page=3`
        );
        const photoData = await photoRes.json();
        place.images = photoData.results.map((r) => r.urls.regular);
      }
    }

    res.json(parsedPlaces);
  } catch (err) {
    console.error("❌ Error in /generatePlaces:", err);
    res.status(500).json({ error: "Failed to fetch tourist places." });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
