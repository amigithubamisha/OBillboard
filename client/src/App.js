// App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import NotFoundPage from './Pages/NotFoundPage';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ProfilePage from './Pages/ProfilePage';
import HelpAndSupport from './Pages/HelpAndSupport';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import TermsAndConditions from './Pages/TermsAndConditions';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import CreateAds from './Pages/CreateAds';
import Admin from './components/Admin'; // Import the AdminDashboard component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from './context/LoginContext';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Contact from './components/pages/Contact';
import User from './components/pages/User';
import Advertisements from './components/pages/Advertisements';
import Sidebar from './components/Sidebar';

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const renderProtectedRoute = (element, isAdminRequired = false) => {
    const shouldRender = userLogin && (!isAdminRequired || isAdmin);
    return shouldRender ? element : <Navigate to="/signin" />;
  };

  useEffect(() => {
    // Your authentication logic here to set userLogin and isAdmin
    const storedLogin = localStorage.getItem("jwt");
    const storedAdminToken = localStorage.getItem("adminToken");

    setIsAdmin(!!storedAdminToken);

    if (storedAdminToken) {
      setUserLogin(true);
    } else if (storedLogin) {
      setUserLogin(true);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ setUserLogin, setModalOpen, setIsAdmin }}>
      <Navbar login={userLogin} isAdmin={isAdmin} />
      <div className="app-container">
        {isAdmin && <Sidebar />} {/* Show sidebar only if user is an admin */}
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/createads" element={renderProtectedRoute(<CreateAds />)} />
            <Route path="/profile" element={renderProtectedRoute(<ProfilePage />)} />
            <Route path="/helpandsupport" element={<HelpAndSupport />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            {/* <Route path="/admin" element={<Admin />} /> */}
            <Route path="/admin" element={renderProtectedRoute(<Admin />)} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/user" element={<User />} />
            <Route path="/ads" element={<Advertisements />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
      <ToastContainer theme="dark" />
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
    </LoginContext.Provider>
  );
}

export default App;
