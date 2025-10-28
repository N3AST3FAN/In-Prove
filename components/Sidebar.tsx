
import React from 'react';
import type { Page } from '../types';
import { 
  DashboardIcon, 
  ChartBarIcon, 
  PlusCircleIcon, 
  WrenchScrewdriverIcon, 
  CogIcon, 
  DocumentChartBarIcon,
  ArrowTrendingUpIcon,
  ChevronLeftIcon
} from './common/icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, page, currentPage, setCurrentPage, isCollapsed }) => {
  const isActive = currentPage === page;
  return (
    <li>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage(page);
        }}
        className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-orange-600 text-white shadow-lg'
            : 'text-slate-400 hover:bg-slate-700 hover:text-white'
        }`}
      >
        <div className="w-6 h-6">{icon}</div>
        <span className={`ml-4 font-medium transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>{label}</span>
      </a>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isOpen, setOpen }) => {
  const navItems = [
    { icon: <DashboardIcon className="w-6 h-6" />, label: 'Dashboard', page: 'dashboard' as Page },
    { icon: <ChartBarIcon className="w-6 h-6" />, label: 'Miglioramenti', page: 'improvements' as Page },
    { icon: <PlusCircleIcon className="w-6 h-6" />, label: 'Nuova Miglioria', page: 'add-improvement' as Page },
    { icon: <WrenchScrewdriverIcon className="w-6 h-6" />, label: 'Utensileria', page: 'tools' as Page },
    { icon: <CogIcon className="w-6 h-6" />, label: 'Macchine', page: 'machines' as Page },
    { icon: <DocumentChartBarIcon className="w-6 h-6" />, label: 'Reports', page: 'reports' as Page },
  ];

  return (
    <>
      <div className={`fixed inset-y-0 left-0 bg-slate-900 border-r border-slate-800 z-30 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className={`flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800 shrink-0">
                <div className={`flex items-center ${isOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                    <ArrowTrendingUpIcon className="w-8 h-8 text-orange-500"/>
                    <span className={`ml-2 text-xl font-bold text-white whitespace-nowrap transition-opacity duration-300 ${!isOpen && 'md:hidden'}`}>
                      InProve
                    </span>
                </div>
            </div>

            <nav className="flex-1 p-3">
                <ul>
                    {navItems.map((item) => (
                        <NavItem
                            key={item.page}
                            {...item}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            isCollapsed={!isOpen}
                        />
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button 
                  onClick={() => setOpen(!isOpen)}
                  className="hidden md:flex items-center p-3 w-full rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white"
                >
                    <ChevronLeftIcon className={`w-6 h-6 transition-transform duration-300 ${!isOpen && 'rotate-180'}`} />
                    <span className={`ml-4 font-medium transition-opacity duration-300 ${!isOpen ? 'opacity-0' : 'opacity-100'}`}>Collapse</span>
                </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
