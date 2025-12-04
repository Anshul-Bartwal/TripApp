import { Routes,Route } from 'react-router';
import './App.css'
import { HomePage } from './pages/home/HomePage'
import { DestinationInfo } from './pages/destinationInfo/DestinationInfo';
import { Itinerary } from './pages/itinerary/Itinerary';


function App() {

  return (
    <>
    <Routes>
      <Route index element={<HomePage/>} />
      <Route path="/dest" element={<DestinationInfo/>} />
      <Route path='/itinerary' element={<Itinerary/>} />
    </Routes>
    </>
  )
}

export default App
