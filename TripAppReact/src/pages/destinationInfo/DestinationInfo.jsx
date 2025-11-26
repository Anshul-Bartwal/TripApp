import { Modal } from "./Modal.jsx";
import { Chat } from "../chat/Chat.jsx";

import { useState, useEffect } from "react"
import axios from "axios";

import './destinationInfo.css';
import { Header } from "../header/header.jsx";
export function DestinationInfo() {
    const [placesData, setPlacesData] = useState([]);
    const [ loadModal, setLoadModal ] = useState(false);
    const [place, setPlace ] = useState("");
    const [ showChat, setShowChat ] = useState(false);
    const [ tripContextAi, setTripContextAi ] = useState({});

    useEffect(() => {
        const tripContext = JSON.parse(localStorage.getItem('tripDetails'));
        
        // console.log(tripContext);
        

        const showDestinationInfo = async (destination) => {
            // const cardGrid = document.getElementById("place-cards");
            // cardGrid.innerHTML = `<p>Loading top spots...</p>`;
            try {
                // console.log("Fetching places for destination:", destination);


                const response = await axios.post('/api/generatePlaces', { destination });
                console.log("Received response:", response.data);
                setPlacesData((r) => { r = response.data; return r; })
                setTripContextAi(tripContext);
                // console.log("placesData = ", placesData);

            } catch (err) {
                console.error("Error fetching places:", err);
                // cardGrid.innerHTML = "<p>Error loading attractions.</p>";
            }
        }
        showDestinationInfo(tripContext.destination);

    }, []);




    //     document.querySelectorAll(".place-card").forEach((card, i) => {
    //         card.addEventListener("click", () => openPlaceModal(data[i]));
    //     });
    // }
    function showModal(placeData) {
        setPlace(placeData);
        setLoadModal(true);
    }

    return (
        <>
            <Header />
            <section id="destination-info">


                <div className="info-header">
                    <h1 id="place-title">Top Tourist Spots</h1>
                    <p id="place-desc">Select a destination to explore the top attractions!</p>
                </div>

                <div className="destination-layout">
                    {/* <div id="photo-viewer" className="photo-card hidden">
                        <button className="slide-btn" id="prev-img">‹</button>
                        <img id="viewer-img" alt="Tourist Spot" />
                        <button className="slide-btn" id="next-img">›</button>
                        <p id="photo-caption"></p>
                    </div> */}

                    <div id="place-cards" className="card-grid">
                        {placesData.length === 0 ? (
                            <p>Loading top spots...</p>
                        ) : (
                            
                            placesData.map((p, i) => {
                                {console.log(placesData)}
                                return (
                                    

                                    <div className="place-card" data-index={i} key={i} onClick={() => showModal(p)}>
                                        <img
                                            src={p.images[0] || `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80`}
                                            alt={p.name}
                                            referrerPolicy="no-referrer"
                                        />
                                        <div className="info">
                                            <h3>{p.name}</h3>
                                            <p>{p.description}</p>
                                        </div>
                                    </div>

                                )
                            })

                        )
                        }

                    </div>
                </div>

                {loadModal && place && <Modal place={place} setPlace={setPlace} setShowChat={setShowChat} />}       
            </section>

                
            {showChat ? 
                ( <Chat setShowChat={setShowChat} tripContext={tripContextAi} />)
                :( <button id="chat-toggle" onClick={() => {setShowChat(true)}}>💬 Ask AI</button>
                )
  }
        </>
    )
}
