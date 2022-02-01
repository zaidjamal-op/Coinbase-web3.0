import React from 'react';

const Header = () => {
  return <div className="flex items-center border-b border-[#282b2f] p-6 w-10/12 space-x-4">
      <div className="text-4xl font-semibold flex-1 text-white">Assets</div>
      <div className="flex space-x-4">
      <button className="bg-[#3773f5] text-black rounded-md w-28 h-12 font-medium text-lg py-2 px-2 border border-gray-400">Buy / Sell</button>
      <button className="text-white rounded-md w-36 h-12 font-medium text-lg border border-gray-400">Send / Receive</button>
      </div>
  </div>;
};

export default Header;
