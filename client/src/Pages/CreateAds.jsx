// components/CreateAds.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterSection from '../components/FooterSection';
import './CreateAds.css';

const CreateAds = () => {
  const navigate = useNavigate();
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [urls, setUrls] = useState("");

  const calculateAmount = () => {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const diffInDays = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
      const ratePerDay = 10; // Replace with your own rate
      return diffInDays * ratePerDay;
    }
    return 0;
  };

  const postDetails = async (event) => {
    event.preventDefault();

    // Validate if all fields are filled
    if (!body || images.length === 0 || !document.getElementById("category").value || !document.getElementById("address").value || !startDate || !endDate) {
      toast.error('Please enter all fields.');
      return;
    }

    // Validate if start date is before end date
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (startDateObj > endDateObj) {
      toast.error('Please choose a valid end date that comes after the start date.');
      return;
    }

    try {
      const calculatedAmount = calculateAmount();

      const cloudinaryPromises = images.map(async (image) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "obillboard");
        data.append("cloud_name", "amishacloud");

        const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/amishacloud/image/upload", {
          method: "post",
          body: data
        });
        const cloudinaryData = await cloudinaryResponse.json();
        return cloudinaryData.url;
      });

      const cloudinaryUrls = await Promise.all(cloudinaryPromises);
      setUrls(cloudinaryUrls);

      const postResponse = await fetch("/createPost", {
        method: "post",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          body,
          pics: cloudinaryUrls,
          category: document.getElementById("category").value,
          address: document.getElementById("address").value,
          startDate,
          endDate,
          amount: calculatedAmount,
        })
      });

      const postData = await postResponse.json();
      console.log(postData);

      toast.success('Ads posted successfully!');
      navigate('/');

    } catch (err) {
      console.log(err);
    }
  };

  const loadFiles = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);

    const output = document.getElementById("output");
    output.innerHTML = ""; // Clear previous previews

    files.forEach((file) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.onload = function () {
        URL.revokeObjectURL(this.src);
      };
      output.appendChild(img);
    });
  };

  return (
    <>
      <form className="create-post-container" onSubmit={postDetails}>
        {/* <div className="post-header">
          <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        </div> */}
        <select id="category" name="category" defaultValue="">
          <option value="" disabled hidden>Select the type of ads you want to post</option>
          <option value="Hotels">Hotels</option>
          <option value="Rents">Rents</option>
          <option value="Shops">Shops</option>
        </select>
        <input
          type="text"
          id="address"
          placeholder="Enter your address"
        />
        <label>How many days/months you want to give the ads</label>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <div>
          <strong>Amount to Pay:</strong> Rs.{calculateAmount()}
        </div>
        <div className="main-div">
          <div id="output"></div>
          <input
            type="file"
            accept="image/*"
            onChange={loadFiles}
            multiple
          />
        </div>
        <hr />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          type="text"
          placeholder="Write details about your rent/hotels...."
        ></textarea>
        <button id="post-btn" type="submit">Next</button>
      </form>
      <ToastContainer autoClose={3000} />
      <FooterSection />
    </>
  );
}

export default CreateAds;
