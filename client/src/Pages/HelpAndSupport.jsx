// HelpAndSupport.js
import React from 'react';
import './HelpAndSupport.css';
import FooterSection from "../components/FooterSection"
const HelpAndSupport = () => {
  return (
    <>
    <div className="help-and-support-container">
      <div className="help-and-support-header">
        <h1 className='help'>Help and Support</h1>
      </div>
      <div className="help-and-support-content">
        <p>
          Welcome to our Help and Support page! If you have any questions or
          issues, please feel free to reach out to our support team.
        </p>
        {/* Include additional content as needed */}
      </div>
      <div className="help-and-support-contact">
        <h2 className='help'>Contact Information</h2>
        <p className='help-support'>Email: oretes@gmail.com</p>
        <p className='help-support'>Phone: +91 1234567890</p>
      </div>
    </div>
    <FooterSection />
    </>
  );
};

export default HelpAndSupport;
