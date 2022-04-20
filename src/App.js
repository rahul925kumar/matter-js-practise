import './App.css';
import { BrowserRouter, Routes,  Route, Link } from "react-router-dom";

import Matter from './components/Locket'
import Check from './components/Test'
import TerrianExample from './components/Terrian';
import CircleLocket from './components/CircleLocket';
import HeartLocket from './components/HeartLocket';
import OvalLocket from './components/OvalLocket';
import PearLocket from './components/PearLocket';
import Demo from './components/Demo';
import Chain from './components/Chain';
function App() {
  return (
    <div className="App">
      {/* <Matter /> */}
      {/* <CircleLocket /> */}
      {/* <Chain /> */}
      {/* <Demo /> */}
      {/* <Check /> */}
      {/* <HeartLocket /> */}
      {/* <OvalLocket /> */}
      {/* <PearLocket /> */}
      {/* <TerrianExample /> */}
      <BrowserRouter>

        <div>
          <Routes>
          <Route path="chain" element={<Chain />} />
          <Route path="demo" element={<Demo />} />
          </Routes> 
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
