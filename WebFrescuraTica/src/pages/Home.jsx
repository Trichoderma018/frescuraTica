import React from 'react'
import Navbarr from '../components/Navbarr'
import '../styles/HomeComponent.css'
import HeroSlider from '../components/HeroSlider'
import HomeComponent from '../components/HomeComponent'
import Footer from '../components/Footer'


function Home() {
  return (
    <div>
        <Navbarr />
        <HeroSlider />
        <HomeComponent 
          productImages={["../../public/assets/images/image.png", "../../public/assets/images/productos-agricolas.avif", "../../public/assets/images/canasta.avif"]}
          conocenosImages={["../../public/assets/images/productos-agricolas-inspeccion.jpg", "../../public/assets/images/verduras.jpg"]}
        />
        <Footer />
    </div>
  )
}

export default Home