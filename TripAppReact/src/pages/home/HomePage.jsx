import './homepage.css';
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


            
        </span>
    )
}