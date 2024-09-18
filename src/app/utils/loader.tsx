// // Loader.tsx
// import React from "react";
// import "./loader.css";
// const Loader = () => {
//   return (
//     <div className="design-wrapper">
//       <div className="swastik-wrapper">
//         <div className="swastik1"></div>
//         <div className="dot1"></div>
//         <div className="swastik1 rotate-90"></div>
//         <div className="dot2"></div>
//       </div>
//       <div className="loading-text">loading...</div>
//     </div>
//   );
// };

// export default Loader;

import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex flex-col items-center">
          <FaSpinner className="text-4xl text-blue-500 animate-spin" />
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;