import {  useEffect, useState,useRef } from "react";
import axios from "axios";
import { Message } from "./Message.jsx";
export function Chat({ setShowChat,tripContextAi }) {
    const [ messages,setMessages ] = useState(() => {
        const storedMessages = localStorage.getItem("chatMessages");
        console.log(`storedmessage: ${storedMessages}`);
        return storedMessages ? JSON.parse(storedMessages) : [{
            message: `Hey! Planning your trip? Ask me anything!`,
            sender: "bot"
        }];
    });

    const [ inputMessage, setInputMessage ] = useState("");

    const chatBoxRef = useRef(null);
    useEffect(() =>{
        localStorage.setItem("chatMessages", JSON.stringify(messages));
        if(chatBoxRef.current){
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    },[messages]);


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
            removeMessage();
            addMessage("bot", "Error connecting to AI.");
        }
    }

    function addMessage(sender, text) {
        // chatBox.scrollTop = chatBox.scrollHeight;
        if(text.trim() === ""){
            return;
        }
        setMessages((m) => [...m, {message: text, sender: sender}]);
        setInputMessage("");
    }

    return (
        <div id="chat-container" className="active">
            <div id="chat-header">
                <span>Travel Assistant</span>
                <button id="close-chat" onClick={() => setShowChat(false)}>✖</button>
            </div>
            <div id="chat-box" ref={chatBoxRef}>
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