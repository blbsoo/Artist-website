import React, { useState } from 'react';
import Sidebar from './Sidebar';
import CombinedMusicPromotionDashboard from '../pages/CombinedMusicPromotionDashboard';
import CombinedWatchNowDashboard from '../pages/CombinedWatchNowDashboard';
import CombinedAnnouncementsDashboard from '../pages/CombinedAnnouncementsDashboard';
import SubscribersDashboard from '../pages/SubscribersDashboard';
import StoreDashboard from '../pages/StoreDashboard'; // New import

function DashboardLayout() {
  const [activeSection, setActiveSection] = useState('newMusic');

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="text-center p-4">
        <h1 className="text-4xl text-white" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>JAMEELA WALKER</h1>
        <h2 className="text-red-500 text-2xl" style={{ fontFamily: 'Roboto Mono, monospace', letterSpacing: '0.1em' }}>DASHBOARD</h2>
      </div>
      <div className="flex flex-1">
        <Sidebar setActiveSection={setActiveSection} />
        <div className="flex-1 p-5">
          {activeSection === 'newMusic' && <CombinedMusicPromotionDashboard />}
          {activeSection === 'watchNow' && <CombinedWatchNowDashboard />}
          {activeSection === 'announcements' && <CombinedAnnouncementsDashboard />}
          {activeSection === 'subscribers' && <SubscribersDashboard />}
          {activeSection === 'store' && <StoreDashboard />} {/* New section */}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
