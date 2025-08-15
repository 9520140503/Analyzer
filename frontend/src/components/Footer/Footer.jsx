import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import mainImage from '../../assets/guideIcon.png';
import { Linkedin, Twitter, Github } from 'lucide-react';

function Footer() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    { name: 'Home', path: '/', status: true },
    { name: 'Login', path: '/login', status: !authStatus },
    { name: 'Register', path: '/signup', status: !authStatus },
    { name: 'Cv Analyzer', path: '/analyzer', status: authStatus },
    { name: 'Career Guide', path: '/career-guide', status: authStatus },
    { name: 'Interview Guide', path: '/interview-guide', status: authStatus },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} className="text-white hover:text-orange-300 transition-colors" />,
      url: 'https://www.linkedin.com/company/yourcompany',
    },
    {
      name: 'Twitter',
      icon: <Twitter size={20} className="text-white hover:text-blue-300 transition-colors" />,
      url: 'https://twitter.com/yourcompany',
    },
    {
      name: 'GitHub',
      icon: <Github size={20} className="text-white hover:text-green-300 transition-colors" />,
      url: 'https://github.com/yourcompany',
    },
  ];

  return ( 
    <footer className="bottom-0 left-0 z-0 w-full bg-white/10 backdrop-blur-md text-white py-6 sm:py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Logo and Heading */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2">
              <img
                src={mainImage}
                alt="CareerParto Logo"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                CareerParto
              </h2>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-gray-300 text-center sm:text-left">
              Empowering your career journey
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 text-center sm:text-left">
              {navItems.map(
                (navItem) =>
                  navItem.status && (
                    <li key={navItem.path}>
                      <NavLink
                        to={navItem.path}
                        className={({ isActive }) =>
                          `text-xs sm:text-sm transition-colors ${
                            isActive ? 'text-orange-500' : 'text-white hover:text-orange-300'
                          }`
                        }
                      >
                        {navItem.name}
                      </NavLink>
                    </li>
                  )
              )}
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect With Us</h3>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 pt-4 border-t border-white/20 text-center">
          <p className="text-xs sm:text-sm text-gray-300">
            &copy; {new Date().getFullYear()} CareerParto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;