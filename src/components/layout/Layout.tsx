import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const SIDEBAR_WIDTH = 260;

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-surface relative">
      {/* Ambient glow orbs */}
      <div className="glow-orb glow-orb--red" />
      <div className="glow-orb glow-orb--blue" />

      {/* Fixed left sidebar */}
      <Sidebar />

      {/* Main content — offset by sidebar width */}
      <main
        className="flex-1 overflow-y-auto min-h-screen relative z-10"
        style={{ marginLeft: SIDEBAR_WIDTH }}
      >
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
