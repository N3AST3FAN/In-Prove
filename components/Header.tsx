
import React, { useState } from 'react';
import { UserCircleIcon, Bars3Icon, LogoutIcon } from './common/icons';

interface HeaderProps {
  onLogout: () => void;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, toggleSidebar, isSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex-shrink-0 bg-slate-900 border-b border-slate-800">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-slate-400 hover:text-white focus:outline-none"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <div className='hidden md:block'></div>

        <div className="flex items-center">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-orange-500"
            >
              <span className="sr-only">Open user menu</span>
              <UserCircleIcon className="h-8 w-8 text-slate-400 hover:text-white" />
              <span className="ml-2 hidden md:block text-slate-300 font-medium">Mario Rossi</span>
            </button>

            {dropdownOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-slate-800 ring-1 ring-black ring-opacity-5 z-20"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onLogout(); }}
                  className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                  role="menuitem"
                >
                  <LogoutIcon className="h-5 w-5 mr-3"/>
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
