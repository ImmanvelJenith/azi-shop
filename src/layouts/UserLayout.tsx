import React, { useState } from 'react';
import Layout from './Layout';
import Sidebar from '../components/common/Sidebar';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const UserLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Layout>
      <div className="flex relative">
        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
              <Sidebar isMobile={true} onClose={() => setSidebarOpen(false)} />
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar isMobile={false} />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <Outlet />
        </main>
      </div>
    </Layout>
  );
};

export default UserLayout;
