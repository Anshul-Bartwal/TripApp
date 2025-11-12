// script.js

let tripContext = {}; // Store user preferences

const tripForm = document.getElementById("trip-form");
const chatToggle = document.getElementById("chat-toggle");
const chatContainer = document.getElementById("chat-container");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

chatToggle.style.display = "none";

tripForm.addEventListener("submit", (e) => {
  e.preventDefault();

  tripContext = {
    destination: document.getElementById("destination").value,
    type: document.getElementById("trip-type").value,
    budget: document.getElementById("budget").value,
    duration: document.getElementById("duration").value,
  };

  if (!tripContext.destination) {
    alert("Please select at least a destination!");
    return;
  }

  document.getElementById("trip-setup").style.display = "none";
  chatToggle.style.display = "block";

  setTimeout(() => {
    alert(
      `Trip saved! Planning a ${tripContext.type} trip to ${tripContext.destination} with a ₹${tripContext.budget} budget. Click “Ask AI” to chat!`
    );
  }, 300);
});

chatToggle.addEventListener("click", () => {
  chatContainer.classList.add("active");

  if (!chatBox.dataset.greeted) {
    const greetMsg = `Hi there! 👋 Planning a ${tripContext.type.toLowerCase()} trip to ${tripContext.destination}? I can help you find the best places, routes, and food options!`;
    addMessage("bot", greetMsg);
    chatBox.dataset.greeted = "true";
  }
});

closeChat.addEventListener("click", () => {
  chatContainer.classList.remove("active");
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
    const lastMsg = chatBox.querySelector(".bot:last-child");
    if (lastMsg) lastMsg.remove();
    addMessage("bot", data.reply);
  } catch (err) {
    console.error(err);
    addMessage("bot", "⚠️ Something went wrong talking to Gemini!");
  }
}

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  msg.style.opacity = 0;
  setTimeout(() => (msg.style.opacity = 1), 50);
}
