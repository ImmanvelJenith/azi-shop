import React from 'react';
import Sidebar from '../components/common/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={false} />
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
