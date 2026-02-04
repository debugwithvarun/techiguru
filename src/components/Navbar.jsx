import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Search, ShoppingCart, ChevronDown, ChevronRight, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const navLinks = [
    { name: 'Home', path: '/', hasDropdown: false },
    { name: 'Courses', hasDropdown: true, dropdownItems: ['Full Stack', 'AI/ML', 'Data Science', 'Mobile Development'] },
    { name: 'About Us', path: '/about', hasDropdown: false },
    { name: 'Traings', hasDropdown: true, dropdownItems: ['Active','Inactive'] },
    { name: 'Contact Us', path: '/contact', hasDropdown: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-[100] border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 h-24 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">TechiGuru</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative py-8"
              onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {!link.hasDropdown ? (
                <Link
                  to={link.path}
                  className="text-[15px] font-bold text-slate-700 hover:text-purple-600 transition"
                >
                  {link.name}
                </Link>
              ) : (
                <span className="flex items-center gap-1 text-[15px] font-bold text-slate-700 cursor-pointer">
                  {link.name} <ChevronDown size={14} />
                </span>
              )}

              <AnimatePresence>
                {activeDropdown === link.name && link.dropdownItems && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-md border border-gray-100 py-4"
                  >
                    {link.dropdownItems.map((item) => (
                      <span
                        key={item}
                        className="flex items-center justify-between px-6 py-2.5 text-[14px] font-semibold text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-all group cursor-pointer"
                      >
                        {item}
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <button className="text-slate-700 hover:text-purple-600">
            <Search size={20} />
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-5">
              <div className="relative cursor-pointer">
                <div className="bg-purple-600 p-2.5 rounded-lg text-white shadow-xl shadow-purple-200">
                  <ShoppingCart size={18}/>
                </div>
                <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  0
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg border-2 border-gray-100 overflow-hidden cursor-pointer">
                <img src="https://i.pravatar.cc/150?u=a" alt="profile"/>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="bg-slate-900 px-8 py-3 rounded-md font-bold text-sm text-white"
            >
              <LogIn size={16} /> LOGIN
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
