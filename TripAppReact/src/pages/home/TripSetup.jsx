import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import'./homepage.css';
import './tripsetup.css';

export function TripSetup(){
    const [ tripDetails,setTripDetails ] = useState({
        destination: "",
        tripType: "Adventure",
        budget: "5000-10000",
        duration: "Weekend"
    });
    const navigate = useNavigate();

    



    function saveTripData(details){
        try{
            localStorage.setItem('tripDetails', JSON.stringify(details));
        }
        catch(e){
            console.error("Error Saving trip details to local Storage: ",e);
        }
    }
    function valueChange(e){
        let { id,value } = e.target;
        setTripDetails((t) => {
            if(id === "trip-type"){
                id = "tripType";
            }
            return{
                ...t,
                [id]:value
            }
        })
    }
    function handleContinue(e){
        e.preventDefault();
        console.log("Trip Details:",tripDetails);
        saveTripData(tripDetails);
        navigate('/dest');

        
        
        
    }


    return (
        <section id="trip-setup">
            <h1 className='trip-heading'>Plan Your Trip</h1>
            <form id="trip-form" onSubmit={handleContinue}>
                <label>Choose Destination:</label>
                <select id="destination" required onChange={valueChange} value={tripDetails.destination}>
                    <option value="" disabled>Select</option>
                    <option value="Dehradun">Dehradun</option>
                    <option value="Rishikesh">Rishikesh</option>
                    <option value="Nainital">Nainital</option>
                </select>

                <label>Trip Type:</label>
                <select id="trip-type" onChange={valueChange} value={tripDetails.tripType} required>
                    <option value="Adventure">Adventure</option>
                    <option value="Spiritual">Spiritual</option>
                    <option value="Family">Family</option>
                    <option value="Solo">Solo</option>
                </select>

                <label>Budget Range (₹):</label>
                <select id="budget" onChange={valueChange} value={tripDetails.budget} required>
                    <option value="5000-10000">5000-10000</option>
                    <option value="10000-20000">10000-20000</option>
                    <option value="20000-40000">20000-40000</option>
                    <option value="40000+">40000+</option>
                </select>

                <label>Trip Duration:</label>
                <select id="duration" onChange={valueChange} value={tripDetails.duration} required>
                    <option value="Weekend">Weekend</option>
                    <option value="3-5 days">3–5 days</option>
                    <option value="Week-long">Week-long</option>
                </select>
                <button type="submit" >Continue →</button>
                
                    
                
            </form>
        </section>
    );
}


// to fix :
    // continue thingy is a bit broken