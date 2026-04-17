import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useThemeStore } from '../../store/themeStore';

const SIDEBAR_WIDTH = 256;

const Layout: React.FC = () => {
  const theme = useThemeStore((s) => s.theme);

  /* Ensure data-theme is always synced on mount */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="flex min-h-screen t-transition" style={{ background: 'var(--t-bg)' }}>
      <Sidebar />

      <main
        className="flex-1 overflow-y-auto min-h-screen"
        style={{ marginLeft: SIDEBAR_WIDTH }}
      >
        <div className="p-8 max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
