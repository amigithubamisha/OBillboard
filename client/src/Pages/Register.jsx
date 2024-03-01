import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import FooterSection from '../components/FooterSection';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate()

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const postData = () => {
    // checking empty fields
    if (!firstname || !lastname || !email || !password) {
      notifyA("Please enter all the fields");
      return;
    } else if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    } else if (!passRegex.test(password)) {
      notifyA(
        "Password must contain at least 8 characters, including at least 1 number, lower and uppercase characters, and special characters"
      );
      return;
    }
  
    // sending data to server
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/signin");
        }
        console.log(data);
      });
  };
  
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-cover mt-2" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1478247076/photo/3d-illustration-transparent-and-colorful-wave-background-abstract-and-beautiful-background.jpg?s=612x612&w=0&k=20&c=m0Fz6tCHFbrPuenl0rZDsAToEjXeQmh6pNVom0Peiak=')", maxWidth: '100%', overflowX: 'hidden' }}>
        <div className="shadow-lg rounded-xl p-3 w-[400px] bg-slate-100 bg-opacity-50 flex flex-col gap-2">
          <h2 className="mt-2 text-center font-bold text-3xl text-[#00A9FF]">Sign Up</h2>
            <form className="flex flex-col gap-2 mt-3 pl-3 pr-3">
          <div>
            <div className="flex flex-col">
              <label className="ml-2 text-base font-medium" htmlFor="firstName">
                First Name:
              </label>
              <input
                className="p-2 rounded-lg border gap-2 bg-white"
                type="text"
                placeholder="Enter Your First Name"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <label className="ml-2 text-base font-medium" htmlFor="lastName">Last Name:</label>
              <input
                className="p-2 rounded-lg border gap-2 bg-white"
                type="text"
                placeholder="Enter Your Last Name"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
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
                placeholder="Enter Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col">
          <label className="ml-2 text-base font-medium" htmlFor="password">
            Password:
          </label>
          <div className="relative">
            <input
              className="w-full p-2 pl-10 pr-10 rounded-lg border bg-white"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-2 right-2 cursor-pointer"
              onClick={handleTogglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

          <button type="button"  className="bg-[#00A9FF] text-white py-2 rounded-lg mt-3" onClick={()=>{postData()}}>
            Sign Up
          </button>
          </form>

          <div className="text-sm flex justify-center items-center mt-4 mb-3">
            <p className="text-[#00A9FF] font-medium text-base">Already have an account:</p>
            <Link to="/signin" className="py-2 px-5 bg-white border rounded-lg mx-2">Sign in</Link>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      <div>
        <FooterSection />
      </div>
    </>
  );
};

export default Register;
