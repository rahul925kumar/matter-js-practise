import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* import Matter from './components/Locket'
import Check from './components/Test'
import TerrianExample from './components/Terrian';
import CircleLocket from './components/CircleLocket';
import HeartLocket from './components/HeartLocket';
import OvalLocket from './components/OvalLocket';
import Instafeed from './components/Instafeed';
import Demo from './components/Demo';
import Login from './components/Login'
import Chain from './components/Chain';
import SignUp from './components/SignUp'; */
import Insta from './components/Instafeed';
import { AppProvider } from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="test" exact element={<Check />} />
          <Route path="chain" element={<Chain />} />
          <Route path="demo" element={<Demo />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="circle" element={<CircleLocket />} />
          <Route path='heart' element={<HeartLocket />} /> */}
          <Route path="insta" exact element={<Insta />} />
        </Routes>
      </BrowserRouter> 
    </ AppProvider>
  );
}

export default App;