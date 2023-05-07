import React, { useState } from 'react';
import Auth from './Components/Auth';
import { BrowserRouter as Router } from 'react-router-dom';
import Routesz from './Routesz';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
       <div className="app">
      {!isLoggedIn && <Auth/>}
    </div>
      <Routesz />
    </Router>
  );
}

export default App;