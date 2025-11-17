import { Routes,Route } from 'react-router';
import './App.css'
import { HomePage } from './pages/home/HomePage'
import { DestinationInfo } from './pages/destinationInfo/DestinationInfo';


function App() {

  return (
    <>
    <Routes>
      <Route index element={<HomePage/>} />
      <Route path="/dest" element={<DestinationInfo/>} />
    </Routes>
    </>
  )
}

export default App
