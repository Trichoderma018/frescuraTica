import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Inventory from '../pages/Inventory';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Orders from '../pages/Orders';
import Payment from '../pages/Payment';

function Routing() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/inventory" element={<Inventory/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/payment" element={<Payment/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default Routing