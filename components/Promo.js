import React from 'react';

const Promo = () => {
  return <div className="hidden lg:inline ml-4 xl:w-[290px] py-20 space-y-5">
        <div className="text-white bg-[#0a0b0d] py-2 rounded-md w-9/12 xl:w-11/12 border border-[#282b2f] space-y-5">
        <h4 className="font-bold text-3xl px-4">Yield earned</h4>
        <p className="px-4 text-xl">Earn up to 2.84% APY on crypto</p>
        <div className="mt-4">
        <span className="px-4 text-2xl font-bold">{'$'} 0.000066</span>
        </div>
        </div>

        <div className="text-white bg-[#0a0b0d] py-2 rounded-md w-9/12 xl:w-11/12 border border-[#282b2f] space-y-5">
        <h4 className="font-bold text-3xl px-4">Learn and Earn</h4>
        <p className="px-4 text-xl">Earn up to 2.84% APY on crypto</p>
        <div className="mt-4">
        <span className="px-4 text-2xl font-bold text-[#3773f5] cursor-pointer hover:bg-opacity-10 hover:bg-gray-100 hover:rounded-sm ml-1">Verify Identity</span>
        </div>
        </div>
        
  </div>;
};

export default Promo;
