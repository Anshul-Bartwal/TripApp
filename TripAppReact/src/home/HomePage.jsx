import'./homepage.css';
import { useState } from 'react';
import { TripSetup } from './TripSetup';
export function HomePage() {
    const [ showing,setShowing ] =  useState("overlay");
    function handleStartPlanning(){
        setShowing("trip-setup");
    }
    return (
        <span className="hero-bg">
            {showing==="overlay" &&
                <div className="overlay">
                    <div className="overlay" id="landing">
                    <div className="home-container">
                        <h1>Explore Uttarakhand</h1>
                        <p>Your personal travel companion for mountains, rivers & peace.</p>
                        <button id="start-btn" className="main-btn" onClick={handleStartPlanning}>Start Planning</button>
                    </div>
                    </div>
                </div>
            }
            
            {showing==="trip-setup" &&
                <TripSetup />
            }

            <div id="chat-container" className="hidden">
                <div id="chat-header">
                    <span>Travel Assistant</span>
                    <button id="close-chat">✖</button>
                </div>
                <div id="chat-box"></div>
                <div id="chat-input-area">
                    <input type="text" id="user-input" placeholder="Ask about places..." />
                    <button id="send-btn">Send</button>
                </div>
            </div>

            <div id="place-modal" className="hidden">
                <div className="modal-content">
                    <div className="photo-side">
                        <button id="prev-img" className="slide-btn">‹</button>
                        <img id="modal-img" src="" alt="Tourist Place" />
                        <button id="next-img" className="slide-btn">›</button>
                    </div>

                    <div className="info-side">
                        <h2 id="modal-title"></h2>
                        <p id="modal-desc"></p>

                        <div id="modal-details"></div>

                        <button id="chat-about-btn" className="main-btn">💬 Ask AI About This Place</button>
                        <button id="close-modal" className="close-btn">✖ Close</button>
                    </div>
                </div>
            </div>
        </span>
    )
}