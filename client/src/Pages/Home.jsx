import React from 'react'
import FooterSection from '../components/FooterSection'
import HeroSection from '../components/HeroSection'
import Search from '../components/Search'
import Cards from '../components/Cards'

const Home = () => {
  return (
    <>
      <HeroSection /> 
       {/* <Search /> */}
      <Cards />
      <FooterSection/> 
    </>
  )
}

export default Home