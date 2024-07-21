import React from 'react';

const Sidebar = ({ setActiveSection }) => {
  const menuItems = [
    { name: 'New Music', section: 'newMusic' },
    { name: 'Watch Now', section: 'watchNow' },
    { name: 'Announcements', section: 'announcements' },
    { name: 'Subscribers', section: 'subscribers' },
    { name: 'Store', section: 'store' },
  ];

  return (
    <div className="sidebar bg-black text-white flex justify-center py-4">
      <div className="menu-container">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-item cursor-pointer py-2 px-4 hover:bg-gray-800"
            onClick={() => setActiveSection(item.section)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
