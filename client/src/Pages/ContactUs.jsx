import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterSection from '../components/FooterSection';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });
  const handleSubmit = async () => {
    // Check if any form field is empty
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.message
    ) {
      // If any field is empty, show an error toast message
      toast.error('Please enter all the fields.');
      return;
    }

    // Validate email using a simple regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Validate phone number with at least one digit
    const phoneRegex = /\d/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid phone number.');
      return;
    }
    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Submission successful, show toast message
        toast.success('Message sent successfully!');

        // Reset form fields after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          message: '',
        });
      } else {
        // Submission failed, show error toast message
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Show a generic error toast message
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="contact_us">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="contact_inner">
                <div className="row">
                  <div className="col-md-10">
                    <div className="contact_form_inner">
                      <div className="contact_field">
                        <h3>Contact Us</h3>
                        <p>
                          Feel Free to contact us any time. We will get back to you as soon as we can!.
                        </p>
                        <input
                          type="text"
                          className="form-control form-group"
                          placeholder="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          className="form-control form-group"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <input
                          type="number"
                          className="form-control form-group"
                          placeholder="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          className="form-control form-group"
                          placeholder="Address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                        <textarea
                          className="form-control form-group"
                          placeholder="Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                        <button className="contact_form_submit" onClick={handleSubmit}>
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="right_conatct_social_icon d-flex align-items-end">
                    </div>
                  </div>
                </div>
                <div className="contact_info_sec">
                  <h4>Contact Info</h4>
                  <div className="d-flex info_single align-items-center">
                    <i className="fa-solid fa-phone"></i>
                    <span>+91 1234567890</span>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fa-solid fa-envelope"></i>
                    <span>oretes@gmail.com</span>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>Address: Plot NO-265, 1667, Kalinga Market, Nuasahi, Nayapalli, Bhubaneswar, Odisha 751001</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="map_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="map_inner">
                <h4>Find Us on Google Map</h4>
                <p>
                Explore our office on Google Maps and discover the way to innovation. We look forward to welcoming you to our space!
                </p>
                <div className="map_bind">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.3302027750697!2d85.82364567498252!3d20.286595012855617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909df59def357%3A0xd84dac730a210833!2sOretes%20Consulting%20Private%20Limited!5e0!3m2!1sen!2sin!4v1701540799236!5m2!1sen!2sin" width="100%" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </>
  );
};

export default ContactUs;
