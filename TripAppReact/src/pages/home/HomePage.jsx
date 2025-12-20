import './homepage.css';
import { useState } from 'react';
import { TripSetup } from './TripSetup';
export function HomePage() {
    const [ showing,setShowing ] =  useState("overlay");
    const [ showMenu,setShowMenu ] =  useState(false);
    localStorage.clear();
    function handleStartPlanning(){
        setShowing("trip-setup");
    }

    function handleStart(e){
        setShowMenu(true);
        e.target.style.display="none";
    }
    return (
        <span className="hero-bg">
            <div className="Start">
                <button onClick={handleStart} className='press-to-start'>Press to Start</button>
            </div>
            {showMenu && 
                <div className='menuOptions'>
                    <button id="start-btn" className="main-btn" onClick={handleStartPlanning}>Start Journey </button>
                    <button className='main-btn' onClick={() => setShowing("OurChoice")}>Our Choice</button>
                    <button className='main-btn'>Map</button>
                    <button className='main-btn'>About Us</button>
                </div>
            }
            

            {/* {showing==="overlay" &&
                    <div className="overlay" id="landing">
                        <div className="home-container">
                            <h1>Explore Uttarakhand</h1>
                            <p>Your personal travel companion for mountains, rivers & peace.</p>
                            <button id="start-btn" className="main-btn" onClick={handleStartPlanning}>Start Planning</button>
                        </div>
                    </div>
            }
            */}
            {showing==="trip-setup" &&
                <TripSetup />
            }
 




            
        </span>
    )
}