// Modal.js
import React, { useContext } from "react";
// import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function Modal({ setModalOpen }) {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear JWT from localStorage
    localStorage.removeItem("jwt");

    // Update login state
    setUserLogin(false);

    // Navigate to the signin page
    navigate("/signin", { replace: true });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setModalOpen(false)}>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* modal header */}
        <div className="text-center mb-4">
          <h5 className="text-3xl font-bold">Confirm</h5>
        </div>
        {/* <button className="absolute top-2 right-2" onClick={() => setModalOpen(false)}>
          <RiCloseLine className="text-black"></RiCloseLine>
        </button> */}
        {/* modal content */}
        <div className="text-center text-base mb-4">Are you sure you want to log out?</div>
        <div className="flex justify-end">
        <button
            style={{ backgroundColor: '#00A9FF', color: 'white', padding: '8px 16px', borderRadius: '4px', marginRight: '10px' }}
            onClick={handleLogout}
          >
            Log Out
          </button>

          <button style={{ backgroundColor: '#00A9FF', color: 'white', padding: '8px 16px', borderRadius: '4px', marginRight: '30px' }} onClick={() => setModalOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
