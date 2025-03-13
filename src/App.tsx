import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ConfiguratorLayout from "./layouts/ConfiguratorLayout";


import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import PortfolioLayout from "./layouts/PortfolioLayout";

function App() {
  return (
    <>
      
      <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/portfolio" element={<PortfolioLayout/>} />  
        <Route path="/design" element={<ConfiguratorLayout />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
