import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useThemeStore } from '../../store/themeStore';

const Layout: React.FC = () => {
  const theme = useThemeStore((s) => s.theme);

  /* Ensure data-theme is always synced on mount */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="flex min-h-screen bg-bg transition-colors duration-200">
      <Sidebar />

      <main className="flex-1 overflow-y-auto min-h-screen lg:ml-64">
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
