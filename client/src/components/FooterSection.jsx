import React from "react";
import { Link } from "react-router-dom";
import './FooterSection.css'
const FooterSection = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-4 col-xs-12">
              <div className="single_footer">
                <h4>Useful Links</h4>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/aboutus">About</Link></li>
                  <li><Link to="/contactus">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="single_footer single_footer_address">
                <h4>Other Resources</h4>
                <ul>
                  <li><Link to="/termsandconditions">Term And Condition</Link></li>
                  <li><Link to="/privacypolicy">Privacy Policy</Link></li>
                  <li><Link to="/helpandsupport">Help And Support</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="single_footer single_footer_address">
                <h4>Follow Us</h4>
              </div>
              <div className="social_profile">
                <ul>
                  <li><Link to="https://www.facebook.com/TheOretes/"><i className="fab fa-facebook-f"></i></Link></li>
                  <li><Link to="https://www.instagram.com/p/CN22P8HFS4l/"><i className="fab fa-instagram"></i></Link></li>
                  <li><Link to="https://twitter.com/"><i className="fab fa-twitter"></i></Link></li>
                  <li><Link to="https://in.linkedin.com/company/oretes"><i className="fa-brands fa-linkedin"></i></Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-xs-12">
              <p className="copyright">
                Copyright © 2023 <Link to={"https://oretes.com/"}>Oretes Consulting Pvt. Ltd</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterSection;
