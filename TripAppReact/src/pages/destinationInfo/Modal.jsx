import { useEffect, useState } from "react";
export function Modal({ place, setPlace,setShowChat }) {
    const [images, setImages] = useState([]);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    useEffect(() => {
        console.log(place);
        function loadModalContent() {
            const currentPlace = place;
            setImages(currentPlace.images || [currentPlace.image]);
            if (images.length === 0) {
                setImages(["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"]);
            };


            // function openPlaceModal(place) {
            //     currentPlace = place;
            //     currentImgIndex = 0;

            //     const modal = document.getElementById("place-modal");
            //     const modalImg = document.getElementById("modal-img");

            //     if (!place) return;



            //     const images = place.images || [place.image];
            //     if (images.length) {
            //         modalImg.src = images[0];
            //     } else {
            //         modalImg.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80";
            //     }

            //     modal.classList.remove("hidden");

            //     // Navigation
            //     document.getElementById("prev-img").onclick = () => changePhoto(-1);
            //     document.getElementById("next-img").onclick = () => changePhoto(1);

            //     // Chat about place
            //     document.getElementById("chat-about-btn").onclick = () => {
            //         modal.classList.add("hidden");
            //         chatContainer.classList.remove("hidden");
            //         chatContainer.classList.add("active");
            //         addMessage("bot", `Want to explore more about ${place.name}? I can tell you nearby spots, food, or travel tips!`);
            //     };

            //     document.getElementById("close-modal").onclick = () => {
            //         modal.classList.add("hidden");
            //     };
            // }

        }
        loadModalContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function incrementIndex(index) {
        if(index < images.length-1){
            setCurrentImgIndex((c) => { return c + 1 });

        }else{
            setCurrentImgIndex(0);
        }
    }

    function decrementIndex(index) {
        if(index > 0){
            setCurrentImgIndex((c) => { return c - 1 });
        }else{
            setCurrentImgIndex(images.length - 1);
        }
    }
    function stopModal() {
        setPlace(false)
    }
    function askai(){
        stopModal();
        setShowChat(true);
        
    }
    return (
        <div id="place-modal" >
            <div className="modal-content">
                <div className="photo-side">
                    <button id="prev-img" className="slide-btn" onClick={() => decrementIndex(currentImgIndex)}>‹</button>
                    <img id="modal-img" src={images[currentImgIndex]} alt="Tourist Place" />
                    <button id="next-img" className="slide-btn" onClick={() => incrementIndex(currentImgIndex)}>›</button>
            </div>

            <div className="info-side">
                <h2 id="modal-title">{place.name}</h2>
                <p id="modal-desc">{place.description}</p>

                <div id="modal-details">
                    <p><strong>Best Time:</strong> {place.bestTime}</p>
                    <p><strong>Entry Fee:</strong> {place.entryFee}</p>
                    <p><strong>Timings:</strong> {place.timing}</p>
                    <p><strong>Location:</strong> {place.location}</p>
                </div>

                <button id="chat-about-btn" className="main-btn" onClick={askai}>💬 Ask AI About This Place</button>
                <button id="close-modal" className="close-btn" onClick={stopModal}>✖ Close</button>
            </div>
        </div>
            </div >
        )
}