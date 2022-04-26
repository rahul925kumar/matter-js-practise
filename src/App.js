import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Matter from './components/Locket'
import Check from './components/Test'
import TerrianExample from './components/Terrian';
import CircleLocket from './components/CircleLocket';
import HeartLocket from './components/HeartLocket';
import OvalLocket from './components/OvalLocket';
import PearLocket from './components/PearLocket';
import Demo from './components/Demo';
import Login from './components/Login'
import Chain from './components/Chain';
import SignUp from './components/SignUp';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
          <Routes>
            <Route path="test" exact element={<Check />} />
            <Route path="chain" element={<Chain />} />
            <Route path="demo" element={<Demo />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
