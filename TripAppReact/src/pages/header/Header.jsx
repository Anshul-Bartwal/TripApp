import { Link } from 'react-router'
import { useState } from 'react';
import './header.css'
export function Header() {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="header">
            <div className="header-logo">
                <Link to="/">TripApp</Link>
            </div>

            <nav className={`header-nav ${showMenu ? 'show-nav' : ''}`}>
                <Link to="/">Home</Link>
                <Link to="/destination-info">Destination Info</Link>
                <Link to="/itinerary">Itinerary</Link>
                <Link to="/chat">Chat</Link>
            </nav>

            <div className='nav-actions desktop-only'>
                <button className='location-btn'>Uttarakhand</button>
            </div>

            <div className='menu-toggle mobile-only' onClick={() => setShowMenu((s) => !s)}>☰</div>


            <div className={`mobile-menu ${showMenu ? "show" : ""}`}>
                <Link to="/" onClick={() => setShowMenu(false)}>Home</Link>
                <Link to="/destination-info" onClick={() => setShowMenu(false)}>Destination Info</Link>
                <Link to="/itinerary" onClick={() => setShowMenu(false)}>Itinerary</Link>
                <Link to="/chat" onClick={() => setShowMenu(false)}>Chat</Link>

                <button className="location-btn mobile">
                     Uttarakhand
                </button>
                
            </div>
        </div>
    )

}