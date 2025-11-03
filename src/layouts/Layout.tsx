import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Breadcrumbs from '../components/common/Breadcrumbs';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
