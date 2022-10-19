import React, { useState } from 'react';

import { BrowserRouter, Routes, Route} from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

const App = () => {
  const [user, setUser] = useState();

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage user={user} setUser={setUser}/>} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>      
      </BrowserRouter>
    </React.StrictMode>
  );
}
 
export default App;
