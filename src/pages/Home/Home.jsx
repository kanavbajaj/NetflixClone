import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import herologo from '../../assets/hero_banner.jpg'
import heroname from '../../assets/hero_title.png'
import playicon from '../../assets/play_icon.png'
import infoicon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
    <div className="hero">

      <img src={herologo} alt="" class className="herobanner"/>
      <div className="herotitle">
        <img src={heroname} alt="" /><br></br>
        <div className="hero-btns">
          <button className='btn'><img src={playicon} alt="" />Play</button>
          <button className='btn dark-btn'><img src={infoicon} alt="" />More Info</button>

        </div>
       <TitleCards/>
      </div>
    </div>
    <div className="more-cards">
    <TitleCards title={'Blockbuster Movie'} category={"top_rated"}/>
    <TitleCards title={'Only on netflix'} category={"popular"}/>
    <TitleCards title={'Upcoming'} category={"upcoming"}/>
    <TitleCards title={'Top pics for you'} category={"now_playing"}/>
    </div>
    <div className="footer">
      <Footer/>
    </div>
    </div>
  )
}

export default Home
