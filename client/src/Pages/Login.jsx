import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterSection from '../components/FooterSection';
import { LoginContext } from '../context/LoginContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { setUserLogin, setIsAdmin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    // Check if the user is logged in and update the context
    const userLoggedIn = localStorage.getItem('jwt');
    const adminLoggedIn = localStorage.getItem('adminToken');
    
    // Log the current values for debugging
    console.log('userLoggedIn:', userLoggedIn);
    console.log('adminLoggedIn:', adminLoggedIn);
  
    // Update isAdmin state based on the presence of adminToken
    setIsAdmin(!!adminLoggedIn);
  
    if (userLoggedIn) {
      setUserLogin(true);
    }
  
    if (adminLoggedIn) {
      setIsAdmin(true);
      navigate('/admin');
    }
  
    // If the user is logged in, show a toast message
    if (userLoggedIn) {
      // notifyA('Please log out to access the login page');
      navigate('/');
    }
  }, [setUserLogin, setIsAdmin, navigate]);
  
  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA('Invalid email');
      return;
    }

    // sending data to the server
    fetch('/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else if (data.adminToken) {
          // Admin login success
          notifyB('Admin Signed In Successfully');
          localStorage.setItem('adminToken', data.adminToken);
          setUserLogin(true);
          setIsAdmin(true);
          navigate('/admin'); // Redirect to the admin route
        } else {
          // Regular user login success
          notifyB('Signed In Successfully');
          localStorage.setItem('jwt', data.token);
          setUserLogin(true);
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        // Handle other errors if needed
      });
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-cover mt-2" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1478247076/photo/3d-illustration-transparent-and-colorful-wave-background-abstract-and-beautiful-background.jpg?s=612x612&w=0&k=20&c=m0Fz6tCHFbrPuenl0rZDsAToEjXeQmh6pNVom0Peiak=')", maxWidth: '100%', overflowX: 'hidden' }}>
        <div className="shadow-2xl rounded-xl p-4 w-[400px] bg-slate-100 flex flex-col gap-2 bg-opacity-50 ">
          <h3 className=" mt-3 text-center font-bold text-3xl text-[#00A9FF] ">
            Sign in
          </h3>
          <form className="flex flex-col gap-2 mt-3 pl-3 pr-3">
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

            <button type="button" className="bg-[#00A9FF] text-white py-2 rounded-lg mt-3" onClick={() => { postData() }}>
              Sign In
            </button>
            <p className="mt-2 ml-2 cursor-pointer text-base font-medium hover:text-[#00A9FF] hover:underline">
              Forgot your password?<Link to="/forgot-password">Click Here</Link>
            </p>
          </form>
          <div className="text-sm flex justify-center items-center mt-4 mb-3">
            <p className="text-[#00A9FF] font-medium text-base">Don't have an account:</p>
            <Link to={"/signup"} className="py-2 px-5 bg-white border rounded-lg mx-2">
              Register
            </Link>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default Login;
