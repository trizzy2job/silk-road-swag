import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar.js';
import Routesz from './Routesz';

function App() {
  return (
    <Router>
      <Navbar />
      <Routesz />
    </Router>
  );
}

export default App;