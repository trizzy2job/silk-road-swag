import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Vote from './Pages/Vote';
import Design from './Pages/Design';
import Submit from './Pages/Submit';
import VoteDesktop from './Pages/VoteDesktop';
import Profile from './Pages/Profile'
function Routesz() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/about" element={<About />} />
      <Route path="/design" element={<Design />} />
      <Route path="/submit" element={<Submit/>} />
      <Route path="/voteDesktop" element={<VoteDesktop/>} />
      <Route path="/profile" element={<Profile/>} />
          </Routes>
  );
}

export default Routesz;