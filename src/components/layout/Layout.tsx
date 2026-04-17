import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useThemeStore } from '../../store/themeStore';

const Layout: React.FC = () => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="flex min-h-screen bg-bg transition-colors duration-200">
      <Sidebar />

      <main className="flex-1 min-h-screen ml-64 overflow-x-hidden">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
