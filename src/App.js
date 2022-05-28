import React,{useEffect,useState} from "react";
import "./App.css";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import MapViewer from "./components/Map/MapViewer";
import ProviderRegister from './components/Providers/ProviderRegister'
import ProviderLogin from './components/Providers/ProviderLogin'
import Home from "./components/Home";

function App() {

    const [lat,setLat] = useState()
    const [lon,setLon] = useState()

     useEffect(()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude)
            console.log("Latitude is :", position.coords.latitude);
            setLon(position.coords.longitude)
            console.log("Longitude is :", position.coords.longitude);
          });
     },[])
       
      

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/Sign-Up" element={<SignUp />} />
          <Route exact path="/" element={<Home/>} />
          <Route path="/map" element={<MapViewer lat={lat} lon={lon}/>} />
          <Route path = "/provider-signup" element={<ProviderRegister/>}/>
          <Route path = "/provider-login" element={<ProviderLogin/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;