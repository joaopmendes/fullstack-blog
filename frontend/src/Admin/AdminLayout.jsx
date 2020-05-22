import React from 'react';
import SideNavigation from './sideNavigation';
import Footer from './Footer';

const AdminLayout = ({ children }) => (
  <>
    <div className="flexible-content">
      <SideNavigation />
      <main id="content" className="p-5">
        {children}
      </main>
      <Footer />
    </div>
  </>
);

export default AdminLayout;
