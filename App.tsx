
import React, { useState, useCallback, useMemo } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ImprovementList from './components/ImprovementList';
import AddImprovementForm from './components/AddImprovementForm';
import ToolManagement from './components/ToolManagement';
import MachineManagement from './components/MachineManagement';
import Reports from './components/Reports';
import type { Page } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const renderContent = useMemo(() => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'improvements':
        return <ImprovementList />;
      case 'add-improvement':
        return <AddImprovementForm setCurrentPage={setCurrentPage} />;
      case 'tools':
        return <ToolManagement />;
      case 'machines':
        return <MachineManagement />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  }, [currentPage]);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-300 overflow-hidden">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <Header onLogout={handleLogout} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen}/>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-slate-800/50">
          {renderContent}
        </main>
      </div>
    </div>
  );
};

export default App;
