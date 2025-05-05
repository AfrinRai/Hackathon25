import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" />
        </svg>
    ),
  },
  {
    name: 'Improve CGPA',
    path: '/improve-cgpa',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.662 4.328C18.822 18.364 15.29 21 11 21c-1.657 0-3-1.343-3-3" />
      </svg>
    ),
  },
  {
    name: 'Learn New Skills',
    path: '/learn-skills',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 20h9" />
        <path d="M12 4h9" />
        <path d="M4 9h16" />
        <path d="M4 15h16" />
      </svg>
    ),
  },
  {
    name: 'Dress Better',
    path: '/dress-better',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M16 3h5v2h-5zM3 3h5v2H3zM5 21V7h14v14z" />
      </svg>
    ),
  },
  {
    name: 'Job',
    path: '/job',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 00-8 0v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    name: 'Marathon',
    path: '/marathon',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M18 9l-6 6-3-3" />
      </svg>
    ),
  },
  {
    name: 'Gym',
    path: '/gym',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="9" width="20" height="6" rx="3" />
      </svg>
    ),
  },
  {
    name: 'Movie',
    path: '/movie',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polygon points="5,3 19,12 5,21 5,3" />
      </svg>
    ),
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-blue-900 p-2 rounded-md"
      >
        {isOpen ? (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" />
            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" />
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="3" y1="12" x2="21" y2="12" strokeWidth="2" />
            <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2" />
            <line x1="3" y1="18" x2="21" y2="18" strokeWidth="2" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-green-800 text-white transform transition-transform duration-300 z-40 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
      >
        <div className="py-6 px-4">
          <h2 className="text-2xl font-bold mb-8">Life Goals</h2>
          <nav className="flex flex-col gap-4">
            {links.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 hover:bg-blue-800 px-4 py-2 rounded-md transition ${
                    isActive ? 'bg-blue-800 font-semibold' : ''
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
