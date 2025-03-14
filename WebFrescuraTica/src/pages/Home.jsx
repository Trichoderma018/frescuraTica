import React from 'react'
import Navbarr from '../components/Navbarr'
import '../styles/Home.css'

function Home() {
  return (
    <div>
        <Navbarr />
        <p className='p-home'>Estamos en la paguina home, renderizando el Navbar</p>
    </div>
  )
}

export default Home