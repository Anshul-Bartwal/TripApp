import {  useState } from "react";
import axios from "axios";
import { Message } from "./Message.jsx";
export function Chat({ setShowChat,tripContextAi }) {
    // const [ greeted, setGreeted ] = useState(false);
    const [ messages,setMessages ] = useState([{
        message: `Hey! Planning your trip? Ask me anything!`,
        sender: "bot"
    }]);

    const [ inputMessage, setInputMessage ] = useState("");


    
    // chatToggle.addEventListener("click", () => {
    //     chatContainer.classList.remove("hidden");
    //     chatContainer.classList.add("active");
    //     chatToggle.classList.add("hidden");

    //     if (!chatBox.dataset.greeted) {
    //         addMessage("bot", `Hey! Planning your ${tripContext.type} trip to ${tripContext.destination}? Ask me anything!`);
    //         chatBox.dataset.greeted = "true";
    //     }
    // });

    // closeChat.addEventListener("click", () => {
    //     chatContainer.classList.remove("active");
    //     chatContainer.classList.add("hidden");
    //     chatToggle.classList.remove("hidden");
    // });

    // sendBtn.addEventListener("click", sendMessage);
    // userInput.addEventListener("keypress", (e) => {
    //     if (e.key === "Enter") sendMessage();
    // });
    const removeMessage = () => {
        setMessages((m) => {return m.slice(0,-1);});
    } 
    async function sendMessage(sender,text) {
        

        addMessage(sender, text); //user
        
        addMessage("bot", "Thinking...");

        try {
            
            const response = await axios.post('/api/chat', { message: text, context: tripContextAi });
            removeMessage();
            addMessage("bot", response.data.reply);
        } catch (err) {
            console.error(err);
            addMessage("bot", "Error connecting to AI.");
        }
    }

    function addMessage(sender, text) {
        // msg.classList.add("message", sender);
        // msg.innerHTML = text;
        // chatBox.appendChild(msg);
        // chatBox.scrollTop = chatBox.scrollHeight;
        setMessages((m) => [...m, {message: text, sender: sender}]);
        setInputMessage("");
    }

    return (
        <div id="chat-container" className="active">
            <div id="chat-header">
                <span>Travel Assistant</span>
                <button id="close-chat" onClick={() => setShowChat(false)}>✖</button>
            </div>
            <div id="chat-box">
                {messages.map((message,index) => {
                    return (<Message message={message} key={index} />)
                })}
                
            </div>
            <div id="chat-input-area">
                <input type="text" id="user-input" placeholder="Ask about places..." value={inputMessage} onChange={(e) => {setInputMessage(e.target.value)}} onKeyDown={(e) => { if (e.key === "Enter") {sendMessage("user", inputMessage);}}}/>
                <button id="send-btn" onClick={() => sendMessage("user", inputMessage)}>Send</button>
            </div>
        </div>
    )
}