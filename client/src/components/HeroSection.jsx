// HeroSection.js
import React from 'react';
import './HeroSection.css';
import slider1 from "../assets/slider1.jpg";
import slider2 from "../assets/slider2.jpg";
import slider3 from "../assets/slider3.jpg";

const HeroSection = () => {
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide mt-2 z-0" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={slider2} className="d-block w-100" alt="..." />
            {/* <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div> */}
          </div>
          <div className="carousel-item">
            <img src={slider3} className="d-block w-100" alt="..." />
            {/* <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div> */}
          </div>
          <div className="carousel-item">
            <img src={slider1} className="d-block w-100" alt="..." />
            {/* <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div> */}
          </div>
        </div>
        <button
        style={{ filter: 'brightness(10) invert(1)', color: '#000' }} // Set the color inline
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span
          style={{ filter: 'brightness(0) invert(1)', color: '#000' }} // Set the color inline
          className="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        style={{ filter: 'brightness(10) invert(1)', color: '#000' }} // Set the color inline
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span
          style={{ filter: 'brightness(0) invert(1)', color: '#000' }} // Set the color inline
          className="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
      </div>
      <div>
      </div>
    </>
  );
}

export default HeroSection;
