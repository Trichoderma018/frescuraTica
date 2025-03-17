import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Inventory from '../pages/Inventory';

function Routing() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/inventory" element={<Inventory/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default Routing