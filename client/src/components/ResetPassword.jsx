import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterSection from "./FooterSection";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;

  const isStrongPassword = (password) => {
    // Add your password strength criteria here
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // Passwords do not match, show toast message
      toast.error('Passwords do not match');
      return;
    }

    if (!isStrongPassword(password)) {
      // Password is not strong, show toast message
      toast.error('Please enter a strong password. It should contain at least 8 characters including 1 uppercase character and symbols.');
      return;
    }

    axios.post(`http://localhost:3000/reset-password/${id}/${token}`, { password })
      .then((res) => {
        if (res.data.Status === 'Success') {
          // Password updated successfully, show success toast
          toast.success('Password updated successfully');
          navigate('/signin');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleTogglePassword = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-cover mt-2" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1478247076/photo/3d-illustration-transparent-and-colorful-wave-background-abstract-and-beautiful-background.jpg?s=612x612&w=0&k=20&c=m0Fz6tCHFbrPuenl0rZDsAToEjXeQmh6pNVom0Peiak=')", maxWidth: '100%', overflowX: 'hidden' }}>
        <div className="shadow-2xl rounded-xl p-4 w-[400px] bg-slate-100 flex flex-col gap-2 bg-opacity-50 ">
          <h3 className=" mt-3 text-center font-bold text-3xl text-[#00A9FF] ">
            Reset Your Password
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-3 pl-3 pr-3">
            <div className="flex flex-col">
              <label className="ml-2 text-base font-medium" htmlFor="password">
                Password:
              </label>
              <div className="relative">
                <input
                  className="w-full p-2 pl-10 pr-10 rounded-lg border bg-white"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => handleTogglePassword('password')}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="ml-2 text-base font-medium" htmlFor="confirmPassword">
                Confirm Password:
              </label>
              <div className="relative">
                <input
                  className="w-full p-2 pl-10 pr-10 rounded-lg border bg-white"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => handleTogglePassword('confirmPassword')}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button type="submit" className="bg-[#00A9FF] text-white py-2 rounded-lg mt-3">
              Update
            </button>
          </form>
        </div>
      </div>
      <FooterSection />
      {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
    </>
  );
};

export default ResetPassword;
