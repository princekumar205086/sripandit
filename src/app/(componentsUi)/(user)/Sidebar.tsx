import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4">Logo</div>
      <ul>
        <li className="p-4 hover:bg-gray-700">Dashboard</li>
        <li className="p-4 hover:bg-gray-700">Settings</li>
        <li className="p-4 hover:bg-gray-700">Profile</li>
        <li className="p-4 hover:bg-gray-700">Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;