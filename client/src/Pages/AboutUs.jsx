import React from 'react'
import FooterSection from '../components/FooterSection';
import aboutus from '../assets/aboutus.jpg'

const AboutUs = () => {
  return (
    <>
<section className="px-2 py-20  md:px-0">
  <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
    <div className="flex flex-wrap items-center sm:-mx-3">
      <div className="w-full md:w-1/2 md:px-3">
        <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
          <h1 className="text-2xl font-bold tracking-tight text-black-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-5xl ">
            <span className="block xl:inline">OBILLBOARD!</span>
          </h1>
          <p className="mx-auto text-base text-black-500 sm:max-w-md lg:text-xl md:max-w-3xl">Welcome to Oretes Consulting Private Limited, where innovation meets simplicity. We take pride in introducing our flagship product - Billboard.</p>
          <p className="mx-auto text-base text-black-500 sm:max-w-md lg:text-xl md:max-w-3xl">Who We Are: At Oretes, we are a dedicated team of tech enthusiasts committed to creating cutting-edge solutions. With a passion for software development, we strive to transform ideas into impactful products.</p>
          <p className="mx-auto text-base text-black-500 sm:max-w-md lg:text-xl md:max-w-3xl">Why Choose Billboard:<br/>
             User-Friendly: Navigating complex tasks with ease.
            Innovative Features: Stay ahead with our latest advancements.<br/>
             Reliability: Trust in a product built for your success.</p>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
        <img src={aboutus} alt="..." />
        </div>
      </div>
    </div>
  </div>
  <div className="flex flex-wrap mt-10">
  <div className="w-full md:w-1/3">
    <div className="mt-3 text-center hover:bg- transition duration-300">
      <div className="bg-white rounded-full w-16 h-16 mx-auto flex items-center justify-center shadow-md">
        <i className="fa-solid fa-notdef text-2xl text-custom"></i>
      </div>
      <h5 className="text-dark text-capitalize mt-3 font-bold">Mission</h5>
      <p className="mt-3 text-muted">"Empowering businesses through technology is at the core of our mission. We aim to redefine industry standards and contribute to the success of our clients."</p>
    </div>
  </div>
  <div className="w-full md:w-1/3">
    <div className="mt-3 text-center hover:bg-#00A9FF transition duration-300">
      <div className="bg-white rounded-full w-16 h-16 mx-auto flex items-center justify-center shadow-md">
        <i className="fa-solid fa-eye-low-vision text-2xl text-custom"></i>
      </div>
      <h5 className="text-dark text-capitalize mt-3 font-bold">Vision</h5>
      <p className="mt-3 text-muted">"We aspire to create a haven of relaxation and a gateway to unforgettable experiences, consistently exceeding our guests' expectations."</p>
    </div>
  </div>
  <div className="w-full md:w-1/3">
    <div className="mt-3 text-center hover:bg-#00A9FF transition duration-300">
      <div className="bg-white rounded-full w-16 h-16 mx-auto flex items-center justify-center shadow-md">
        <i className="fa-solid fa-bullseye text-2xl text-custom"></i>
      </div>
      <h5 className="text-dark text-capitalize mt-3 font-bold">Goal</h5>
      <p className="mt-3 text-muted">"We continuously strive for excellence in every aspect of our operations, from the quality of our accommodations to the efficiency of our services."</p>
    </div>
  </div>
</div>
</section>
<FooterSection/>
</>  );
};

export default AboutUs