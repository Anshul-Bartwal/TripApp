import './itinerary.css';
export function Itinerary(){
    const tripDetails = JSON.parse(localStorage.getItem('tripDetails'));
    console.table(tripDetails);
    return (
        <div className="itinerary-page">
            <div className="itinerary-box">
                <h1>Your Itinerary</h1>
                <div className="days">
                    <span className="day-box clickable">D1</span>
                    <span className="day-box clickable">D2</span>                       
                </div>

                <div className="itinerary-details">
                    <div className="time ">
                        <span className="clickable">Morning</span>
                        <span className="clickable">Afternoon</span>
                        <span className="clickable">Evening</span>
                    </div>
                    <span className="itinerary-images">
                        <button className="arrows clickable">&lt;</button>
                        <img src="https://dehraduntourism.co.in/images/places-to-visit/header/mindrolling-monastery-dehradun-tourism-entry-fee-timings-holidays-reviews-header.jpg" 
                            className="itinerary-image">
                            </img>
                        <button className="arrows clickable">&gt;</button>
                    </span>

                    

                    <div className="details">helooo</div>
                </div>

            </div>
        </div>
    )


}