import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routesz from './Routesz';
import './App.css';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
       <div className="app">
    </div>
      <Routesz />
    </Router>
  );
}

export default App;