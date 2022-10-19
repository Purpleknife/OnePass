import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import LandingPage from './components/LandingPage';


const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />

        </Routes>      
      </BrowserRouter>
    </React.StrictMode>
  );
}
 
export default App;
