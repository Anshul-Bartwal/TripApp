// backend/data/localPlaces.js

// We export this as a *named export* so controllers can import it safely.
// Example import:  import { localPlaces } from "../data/localPlaces.js";

export const localPlaces = {
  Dehradun: [
    {
      name: "Robber's Cave (Guchhupani)",
      description: "A natural cave where a river flows through the rocks.",
      images: [
        "https://images.unsplash.com/photo-1617814198890-88b1ebf43c44?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1622925091532-1e6924c2a90b?auto=format&fit=crop&w=900&q=80"
      ],
      bestTime: "March – June",
      entryFee: "₹25",
      timing: "7 AM – 6 PM",
      location: "Guchhupani, Dehradun",
    },

    {
      name: "Sahastradhara",
      description: "Sulphur springs & waterfalls with scenic views.",
      images: [
        "https://images.unsplash.com/photo-1625049109689-3fa7db01a46f?auto=format&fit=crop&w=900&q=80"
      ],
      bestTime: "February – June",
      entryFee: "Free",
      timing: "7 AM – 7 PM",
      location: "Sahastradhara Road, Dehradun",
    },
  ],

  Rishikesh: [
    {
      name: "Lakshman Jhula",
      description: "Famous suspension bridge over the Ganga.",
      images: [
        "https://images.unsplash.com/photo-1608897013039-59e9e1e1fdbf?auto=format&fit=crop&w=900&q=80"
      ],
      bestTime: "October – March",
      entryFee: "Free",
      timing: "Open 24 hours",
      location: "Tapovan, Rishikesh",
    },

    {
      name: "Neer Garh Waterfall",
      description: "Beautiful waterfall with trekking paths.",
      images: [
        "https://images.unsplash.com/photo-1617711426155-3e5c8ee806d1?auto=format&fit=crop&w=900&q=80"
      ],
      bestTime: "March – June",
      entryFee: "₹30",
      timing: "8 AM – 6 PM",
      location: "Neer Village, Rishikesh",
    },
  ],
};
