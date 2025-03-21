import React from 'react'
import InventoryComponent from '../components/InventoryComponent'
import Navbarr from '../components/Navbarr'
import Footer from '../components/Footer'
function Inventory() {
  return (
    <div>
        <Navbarr />
        <InventoryComponent />
        <Footer />
    </div>
  )
}

export default Inventory