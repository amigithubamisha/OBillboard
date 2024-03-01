import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileIcon from '../assets/profile-icon.png';
import FooterSection from '../components/FooterSection';

const ProfilePage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/profile", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setEmail(data.email);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-cover" style={{ maxWidth: '100%', overflowX: 'hidden', marginTop: '10px', marginBottom: '10px', backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/280/619/719/light-stains-faded-dull-wallpaper-preview.jpg')" }}>
        <div className="shadow-lg rounded-xl p-3 w-[500px] bg-slate-100 bg-opacity-50 flex flex-col gap-2">
          <div className="text-center">
            <img
              src={ProfileIcon}
              alt="User Profile Icon"
              className="rounded-full w-28 h-20 mx-auto"
            />
          </div>
          <h2 className="mt-2 text-center font-bold text-3xl text-[#00A9FF]">Profile Details</h2>
          <form className="flex flex-col gap-2 mt-3 pl-3 pr-3">
            <div>
              <div className="flex flex-col">
                <label className="ml-2 text-base font-medium" htmlFor="firstName">
                  First Name:
                </label>
                <input
                  className="p-2 rounded-lg border gap-2 bg-white"
                  type="text"
                  value={firstname}
                  readOnly
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <label className="ml-2 text-base font-medium" htmlFor="lastName">
                  Last Name:
                </label>
                <input
                  className="p-2 rounded-lg border gap-2 bg-white"
                  type="text"
                  value={lastname}
                  readOnly
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <label className="ml-2 text-base font-medium" htmlFor="email">
                  Email:
                </label>
                <input
                  className="p-2 rounded-lg border gap-2 bg-white"
                  type="text"
                  value={email}
                  readOnly
                />
              </div>
            </div>
          </form>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      <FooterSection />
    </>
  );
};

export default ProfilePage;
