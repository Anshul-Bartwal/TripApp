// ==========================
// GLOBAL VARS
// ==========================
let tripContext = {};
let placesData = [];
let currentPlace = null;
let currentImgIndex = 0;

// DOM Elements
const startBtn = document.getElementById("start-btn");
const tripSetup = document.getElementById("trip-setup");
const tripForm = document.getElementById("trip-form");
const destinationInfo = document.getElementById("destination-info");
const chatToggle = document.getElementById("chat-toggle");
const chatContainer = document.getElementById("chat-container");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// ==========================
// START BUTTON
// ==========================
startBtn.addEventListener("click", () => {
  document.querySelector(".overlay").classList.add("hidden");
  tripSetup.classList.remove("hidden");
  
});

// ==========================
// TRIP FORM SUBMIT
// ==========================
tripForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  tripContext = {
    destination: document.getElementById("destination").value,
    type: document.getElementById("trip-type").value,
    budget: document.getElementById("budget").value,
    duration: document.getElementById("duration").value,
  };

  if (!tripContext.destination) {
    alert("Please select a destination!");
    return;
  }

  tripSetup.classList.add("hidden");
  destinationInfo.classList.remove("hidden");
  chatToggle.classList.remove("hidden");

  document.getElementById("place-title").textContent = `Discover ${tripContext.destination}`;
  document.getElementById("place-desc").textContent = `Finding top spots in ${tripContext.destination}...`;

  await showDestinationInfo(tripContext.destination);
});

// ==========================
// LOAD PLACES
// ==========================
async function showDestinationInfo(destination) {
  const cardGrid = document.getElementById("place-cards");
  cardGrid.innerHTML = `<p>Loading top spots...</p>`;

  try {
    const res = await fetch("/api/generatePlaces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination }),
    });

    const data = await res.json();
    placesData = data;

    if (!Array.isArray(data) || data.length === 0) {
      cardGrid.innerHTML = "<p>Could not load attractions.</p>";
      return;
    }

    renderPlaces(data);
  } catch (err) {
    console.error("Error fetching places:", err);
    cardGrid.innerHTML = "<p>Error loading attractions.</p>";
  }
}

// ==========================
// RENDER PLACE CARDS
// ==========================
function renderPlaces(data) {
  const cardGrid = document.getElementById("place-cards");
  cardGrid.innerHTML = data
    .map(
      (p, i) => `
      <div class="place-card" data-index="${i}">
        <img 
          src="${p.images?.[0] || p.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80'}"
          alt="${p.name}"
          referrerpolicy="no-referrer"
        >
        <div class="info">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
        </div>
      </div>`
    )
    .join("");

  document.querySelectorAll(".place-card").forEach((card, i) => {
    card.addEventListener("click", () => openPlaceModal(data[i]));
  });
}

// ==========================
// MODAL VIEW (INFO + PHOTOS)
// ==========================
function openPlaceModal(place) {
  currentPlace = place;
  currentImgIndex = 0;

  const modal = document.getElementById("place-modal");
  const modalImg = document.getElementById("modal-img");

  if (!place) return;

  document.getElementById("modal-title").textContent = place.name;
  document.getElementById("modal-desc").textContent = place.description;
  document.getElementById("modal-details").innerHTML = `
    <p><strong>Best Time:</strong> ${place.bestTime}</p>
    <p><strong>Entry Fee:</strong> ${place.entryFee}</p>
    <p><strong>Timings:</strong> ${place.timing}</p>
    <p><strong>Location:</strong> ${place.location}</p>
  `;

  const images = place.images || [place.image];
  if (images.length) {
    modalImg.src = images[0];
  } else {
    modalImg.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80";
  }

  modal.classList.remove("hidden");

  // Navigation
  document.getElementById("prev-img").onclick = () => changePhoto(-1);
  document.getElementById("next-img").onclick = () => changePhoto(1);

  // Chat about place
  document.getElementById("chat-about-btn").onclick = () => {
    modal.classList.add("hidden");
    chatContainer.classList.remove("hidden");
    chatContainer.classList.add("active");
    addMessage("bot", `Want to explore more about ${place.name}? I can tell you nearby spots, food, or travel tips!`);
  };

  document.getElementById("close-modal").onclick = () => {
    modal.classList.add("hidden");
  };
}

function changePhoto(direction) {
  if (!currentPlace?.images || currentPlace.images.length === 0) return;
  currentImgIndex = (currentImgIndex + direction + currentPlace.images.length) % currentPlace.images.length;
  document.getElementById("modal-img").src = currentPlace.images[currentImgIndex];
}

// ==========================
// CHAT
// ==========================
chatToggle.addEventListener("click", () => {
  chatContainer.classList.remove("hidden");
  chatContainer.classList.add("active");
  chatToggle.classList.add("hidden");

  if (!chatBox.dataset.greeted) {
    addMessage("bot", `Hey! Planning your ${tripContext.type} trip to ${tripContext.destination}? Ask me anything!`);
    chatBox.dataset.greeted = "true";
  }
});

closeChat.addEventListener("click", () => {
  chatContainer.classList.remove("active");
  chatContainer.classList.add("hidden");
  chatToggle.classList.remove("hidden");
});

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";
  addMessage("bot", "Thinking...");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, context: tripContext }),
    });

    const data = await res.json();
    chatBox.lastChild.remove(); // remove 'Thinking...'
    addMessage("bot", data.reply);
  } catch (err) {
    console.error(err);
    addMessage("bot", "Error connecting to AI.");
  }
}

// ==========================
// CHAT MESSAGE HELPERS
// ==========================
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerHTML = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
