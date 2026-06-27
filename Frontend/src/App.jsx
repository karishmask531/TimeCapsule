import './App.css'
import Footer from './components/Footer.jsx';
// import Header from './components/Header.jsx';
// import Main from './components/Main.jsx';
import Navbar from './components/Navbar.jsx';
import Features from './components/Features';
import Theme from './components/theme';


function App() {
  return (
    <>
      <Navbar/>
      <Theme/>
      <Features/>
      <Footer/>
      
      <div className="ticks"></div>
    </>
  )
}

export default App
