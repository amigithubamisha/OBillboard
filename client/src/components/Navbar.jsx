import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';
import './Navbar.css';
import { LoginContext } from '../context/LoginContext';
import Modal from './Modal';

const Navbar = ({ login }) => {
  const navigate = useNavigate();
  const { setUserLogin, setIsAdmin } = useContext(LoginContext);
  const location = useLocation();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isAdmin, setIsAdminState] = useState(false);

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleLogout = () => {
    openLogoutModal(); // Open the logout confirmation modal
  };

  const confirmedLogout = () => {
    localStorage.removeItem("jwt"); // Clear JWT
    localStorage.removeItem("adminToken"); // Clear admin token
    setIsAdminState(false); // Ensure isAdmin is set to false
    closeLogoutModal(); // Close the modal
    setUserLogin(false); // Update login state
    navigate("/signin", { replace: true });
  };

  const loggedInMenu = (
    <>
      {isAdmin ? (
        <li>
          <Link onClick={confirmedLogout}>
            <i className="fa-solid fa-sign-out-alt fa-flip" style={{ color: '#00A9FF' }}></i>Admin Logout
          </Link>
        </li>
      ) : (
        <>
          <li title='Give Advertise'>
            <Link to="/createads">
              <i className="fa-solid fa-rectangle-ad fa-flip" style={{ color: '#00A9FF' }}></i>Create Ads
            </Link>
          </li>
          <li>
            <Link onClick={handleLogout}>
              <i className="fa-solid fa-sign-out-alt fa-flip" style={{ color: '#00A9FF' }}></i>Logout
            </Link>
          </li>
          <li title='Your Profile'>
            <Link to="/profile" className="no-hover">
              <i className="fa-solid fa-user fa-flip" style={{ color: '#000', fontSize: '30px', padding: '15px', borderRadius: '50px', backgroundColor: '#fff' }}></i>
            </Link>
          </li>
        </>
      )}
    </>
  );

  const loggedOutMenu = (
    <>
      <li>
        <Link to="/">
          <i className="fa-solid fa-house fa-flip" style={{ color: '#00A9FF' }}></i>Home
        </Link>
      </li>
      <li>
        <Link to="/aboutus">
          <i className="fa-solid fa-circle-info fa-flip" style={{ color: '#00A9FF' }}></i>About
        </Link>
      </li>
      <li>
        <Link to="/contactus">
          <i className="fa-solid fa-address-book fa-flip" style={{ color: '#00A9FF' }}></i>Contact
        </Link>
      </li>
      <li>
        <Link to="/signup">
          <i className="fa-solid fa-user-plus fa-flip" style={{ color: '#00A9FF' }}></i>Sign up
        </Link>
      </li>
      <li>
        <Link to="/signin">
          <i className="fa-solid fa-right-to-bracket fa-flip" style={{ color: '#00A9FF' }}></i>Sign in
        </Link>
      </li>
    </>
  );

  const closeMenu = () => {
    const checkbox = document.getElementById('check');
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  };

  useEffect(() => {
    const storedLogin = localStorage.getItem("jwt");
    const storedAdminToken = localStorage.getItem("adminToken");

    setIsAdminState(!!storedAdminToken);

    if (storedAdminToken) {
      navigate("/admin", { replace: true });
    } else if (storedLogin) {
      setUserLogin(true);
    }

    closeMenu(); // Close the menu after the redirection or login status is checked
  }, [setUserLogin, navigate]);

  useEffect(() => {
    closeMenu(); // Close the menu when the location changes
  }, [location]);

  return (
    <>
      <nav className="navbar">
        <div className="left">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="right">
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkBtn">
            <i className="fa fa-bars"></i>
          </label>
          <ul className="list">
            {login ? loggedInMenu : loggedOutMenu}
          </ul>
        </div>
      </nav>
      {logoutModalOpen && (
        <Modal
          setModalOpen={closeLogoutModal}
          confirmedLogout={confirmedLogout}
        />
      )}
    </>
  );
};

export default Navbar;
