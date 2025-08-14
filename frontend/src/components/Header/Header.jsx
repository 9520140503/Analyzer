import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import mainImage from "../../assets/guideIcon.png";
import { Menu, X } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { name: "Home", path: "/", status: true },
    { name: "Login", path: "/login", status: !authStatus },
    { name: "Register", path: "/signup", status: !authStatus },
    { name: "Cv Analyzer", path: "/analyzer", status: authStatus },
    { name: "Career Guide", path: "/career-guide", status: authStatus },
    { name: "Interview Guide", path: "/interview-guide", status: authStatus }
  ];

  return (
    <div className="w-full sticky top-0 left-0 z-50 bg-white/10 backdrop-blur-md text-white px-4 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={mainImage} alt="" className="w-7 h-6 md:h-8 md:w-9" />
        <h1 className="text-xl sm:text-2xl md:text-4xl font-medium md:font-semibold">
          CareerParto
        </h1>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-x-12 px-4 md:px-12 lg:px-16 text-sm md:text-md lg:text-lg font-semibold">
        {navItems.map(
          (navItem) =>
            navItem.status && (
              <li key={navItem.path}>
                <NavLink
                  to={navItem.path}
                  className={({ isActive }) =>
                    isActive ? "text-orange-500" : "text-white"
                  }
                >
                  {navItem.name}
                </NavLink>
              </li>
            )
        )}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="sm:hidden p-2"
        onClick={() => setIsMobile((prev) => !prev)}
      >
        {isMobile ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isMobile && (
        <nav className="absolute top-full left-0 w-full bg-white/10 backdrop-blur-lg shadow-md sm:hidden">
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
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Header;
