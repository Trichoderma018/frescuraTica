import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Inventory from '../pages/Inventory';
import Login from '../pages/Login';
import Register from '../pages/Register';

function Routing() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/inventory" element={<Inventory/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default Routing