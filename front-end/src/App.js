import React, { useState } from 'react';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useCookies } from 'react-cookie';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

const App = () => {
  const [user, setUser] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const loggedIn = cookies.user_id;
  console.log('loggedIn', loggedIn);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage user={user} setUser={setUser}/>} />
          {loggedIn && <Route path='/dashboard' element={<Dashboard user={user}/>} /> }
        </Routes>      
      </BrowserRouter>
    </React.StrictMode>
  );
}
 
export default App;
