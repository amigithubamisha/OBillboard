// PrivacyPolicy.js

import React from 'react';
import './PrivacyPolicy.css';
import FooterSection from "../components/FooterSection"
const PrivacyPolicy = () => {
  return (
    <>
    <div className="privacy-policy-container">
      <header className="privacy-policy-header">
        <h1>Privacy Policy</h1>
      </header>
      <section className="privacy-policy-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          gravida purus sit amet tellus malesuada, in euismod libero
          tincidunt...
        </p>
        {/* Include additional content as needed */}
      </section>
      <footer className="privacy-policy-footer">
        <p>Last Updated: February 22, 2024</p>
      </footer>
    </div>
    <FooterSection />
    </>
  );
};

export default PrivacyPolicy;

