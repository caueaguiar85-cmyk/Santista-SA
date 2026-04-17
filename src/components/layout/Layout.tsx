import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useThemeStore } from '../../store/themeStore';

const SIDEBAR_W = 256;

const Layout: React.FC = () => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-bg transition-colors duration-200">
      <Sidebar />

      <main
        className="min-h-screen overflow-x-hidden"
        style={{ marginLeft: SIDEBAR_W }}
      >
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
