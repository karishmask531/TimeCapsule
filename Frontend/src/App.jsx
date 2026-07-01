import './App.css'
// import React from 'react'
// import Footer from './components/Footer.jsx';
// import Header from './components/Header.jsx';
import{Route, Routes} from 'react-router-dom';
// import Theme from './components/theme';
import Login from './Pages/login';
import Signup from './Pages/signup';
import Createcapsule from './Pages/createcapsule';
import Dashboard from './Pages/dashboard';
import Home from './Pages/home';
import MyCapsules from './Pages/mycapsule';
import Profile from './Pages/profile';
// import Logout from './Pages/logout';



function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/createcapsule" element={<Createcapsule/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/mycapsules" element={<MyCapsules/>}/>
      <Route path="/profile" element={<Profile/>}/>
      {/* <Route path="/logout" element={<Logout/>}/> */} 
    </Routes>
       {/* <Header/> */}
      
      <div className="ticks"></div>
    </>
  )
}

export default App
