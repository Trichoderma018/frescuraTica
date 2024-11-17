import React from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Orders from '../pages/Orders.jsx'
import Inventory from '../pages/Inventory.jsx'
import SingIn from '../pages/SingIn.jsx'
import SingUp from '../pages/SingUp.jsx'
import About from '../pages/About.jsx'
import Layout from '../components/Layout/Layout.jsx'
import Payment from '../pages/Payment.jsx'

const routers = () => {
  return <Routes>
    <Route path="/" element={<Navigate to = '/Home'/>} />
    <Route path='/Home' element={<Home />} />

    <Route path='/Orders' element={<Orders />} />
    <Route path= '/Inventory' element={<Inventory />} />
    <Route path= '/About' element={<About />} />
    <Route path= '/Payment' element={<Payment />} />
    <Route path= '/singIn' element={<SingIn />} />
    <Route path= '/singUp' element={<SingUp />} />
    <Route path= '/layout' element={<Layout />} />
  </Routes>
}

export default routers;