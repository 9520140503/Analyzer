import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import guideIcon from "../Assets/guideIcon.png";

function Alert() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/user/get-profile`, {
          method: "GET",
          headers: {
             "Content-Type": "application/json",
             "Authorization":`Bearer ${token}`
          },
        });
        const result = await response.json();
       
        setUserData(result);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-updown animate-glow">
      <div className="bg-white/10 backdrop-blur-0 border-2 border-gray-200 rounded-xl shadow-lg w-full max-w-lg p-6 sm:p-8 shadow-2 shadow-purple-500">
        <div className="flex justify-center">
          <img 
            src={guideIcon} 
            alt="robot icon"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain duration-800 animate-spin" 
          />
        </div>
        <h1 className="text-center text-2xl sm:text-3xl font-bold mt-4 mb-6 text-white">
          Profile Update Alert
        </h1>
        <p className="text-center text-lg sm:text-xl text-emerald-500 mb-8">
          Have you updated your profile? Navigate to Home or update your profile.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 text-center"
          >
            Home
          </Link>
          <Link
            to="/view-profile"
            state={userData}
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 text-center"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Alert;