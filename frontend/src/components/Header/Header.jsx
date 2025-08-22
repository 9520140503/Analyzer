import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link, NavLink } from 'react-router-dom';
import mainImage from "../../assets/guideIcon.png";
import { Menu, X } from "lucide-react";
import Avatar from './Avatar';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState({});
  const [error,setError] = useState('');

  const navItems = [
    { name: "Home", path: "/", status: true },
    { name: "Login", path: "/login", status: !authStatus },
    { name: "Register", path: "/signup", status: !authStatus },
    { name: "Cv Analyzer", path: "/analyzer", status: authStatus },
    { name: "Career Guide", path: "/career-guide", status: authStatus },
    { name: "Interview Guide", path: "/interview-guide", status: authStatus }
  ];
  
  const token = localStorage.getItem('token');

  useEffect(() => {

    if(!token) return;

    const fetchInfo = async() => {
      try {
        const response = await fetch('http://localhost:3000/user/get-profile',{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
        });

        if(!response.ok){
          throw new Error("Error fetching user data");
        }

        const data = await response.json();
        // console.log("User Data:",data);
        setUserData(data);

      } catch (error) {
        console.log(error.message);
        setError(error.message)
      }
    }
    fetchInfo();
  },[token])

  return (
    <div className="w-full mx-auto mb-10  sticky top-0 left-0 z-50 shadow-lg shadow-white  backdrop-blur-md text-white px-4 md:px-8 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={mainImage} alt="" className="w-7 h-6 md:h-8 md:w-9" />
        <Link to={'/'} className="text-xl sm:text-2xl md:text-4xl font-medium md:font-semibold">
          CareerParto
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center sm:gap-x-4 lg:gap-x-12 px-4 md:px-12 lg:px-16 font-semibold">
        {navItems.map(
          (navItem) =>
            navItem.status && (
              <li key={navItem.path} className='text-xs lg:text-lg'>
                <NavLink
                  to={navItem.path}
                  className={({ isActive }) =>
                    isActive ? "text-purple-500" : "text-white"
                  }
                >
                  {navItem.name}
                </NavLink>
              </li>
            )
        )}

        {authStatus &&
            <li><Avatar userInfo={userData}/></li>}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsMobile((prev) => !prev)}
      >
        {isMobile ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isMobile && (
        <nav className="absolute top-full left-0 w-full bg-gray-950 backdrop-blur-lg shadow-md md:hidden">
          <ul className="grid grid-cols-2 text-center">
            {navItems.map(
              (navItem) =>
                navItem.status && (
                  <li key={navItem.path} className="py-2">
                    <NavLink
                      to={navItem.path}
                      onClick={() => setIsMobile(false)}
                      className={({ isActive }) =>
                        isActive ? "text-orange-500 font-bold" : "text-white"
                      }
                    >
                      {navItem.name}
                    </NavLink>
                  </li>
                )
            )}

            {authStatus &&
            <li className='w-fit mx-auto'><Avatar userInfo={userData}/></li>}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Header;
 