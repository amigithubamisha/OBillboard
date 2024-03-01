import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterSection from "./FooterSection";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    // const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/forgot-password', { email });

            if (response.data.Status === 'Success') {
                toast.success('Check your email to reset your password', { autoClose: 5000 });
                // navigate('/signin');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error('Invalid email. Please enter a valid email address', { autoClose: 5000 });
            } else {
                toast.error('Please enter your email', { autoClose: 5000 });
            }
        } finally {
            // Reset the email field after submission
            setEmail('');
        }
    }

    return (
        <>
            <div
                className="h-screen flex items-center justify-center bg-cover mt-2"
                style={{
                    backgroundImage:
                        "url('https://media.istockphoto.com/id/1478247076/photo/3d-illustration-transparent-and-colorful-wave-background-abstract-and-beautiful-background.jpg?s=612x612&w=0&k=20&c=m0Fz6tCHFbrPuenl0rZDsAToEjXeQmh6pNVom0Peiak=')",
                    maxWidth: "100%",
                    overflowX: "hidden",
                }}
            >
                <div className="shadow-2xl rounded-xl p-4 w-[400px] bg-slate-100 flex flex-col gap-2 bg-opacity-50 ">
                    <h3 className=" mt-3 text-center font-bold text-3xl text-[#00A9FF] ">
                        Forgot Your Password
                    </h3>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2 mt-3 pl-3 pr-3"
                    >
                        <div className="flex flex-col">
                            <label className="ml-2 text-base font-medium" htmlFor="email">
                                Email:
                            </label>
                            <input
                                className="p-2 rounded-lg border bg-white"
                                type="email"
                                name="email"
                                placeholder="Enter Your Email ..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#00A9FF] text-white py-2 rounded-lg mt-3"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
            <FooterSection />
        </>
    );
};

export default ForgotPassword;
