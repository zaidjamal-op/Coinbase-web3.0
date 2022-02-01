import Image from 'next/image';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Coin = ({coin}) => {
  return <div className="grid grid-cols-5 gap-5 w-full p-4 ">
      <div>
          <div className="">
              <div className="flex items-center">
                  <div className="w-8 mr-4">
                      <Image src={coin.logo} alt={coin.name} />
                  </div>
                  <div className="hidden xl:inline">
                      <div className="mb-[0.1rem]">{coin.name}</div>
                      <div className="text-[#8a919e] text-sm">{coin.sign}</div>
                  </div>
              </div>
          </div>
      </div>
      <div className="">
              <div className="mb-[0.1rem] text-xs xl:text-lg">{'$'}{coin.balanceUsd}</div>
              <div className="text-xs text-[#8a919e] xl:text-lg">{coin.balanceCoin}</div>
              <div className="text-xs text-[#8a919e] xl:text-lg">{coin.sign}</div>
      </div>
      <div className="">
      <div className="mb-[0.1rem] text-xs xl:text-xl">{'$'}{coin.priceUsd}</div>
      <div className={`${coin.change < 0 ? 'text-[#f0616d] text-xs xl:text-xl' : 'text-[#26ad75] text-xs xl:text-xl'}`}>
            {coin.change > 0 && '+'}
            {coin.change}%
      </div>
      
      </div>
      <div className="text-xs xl:text-xl">{coin.allocation}%</div>
      <div className="flex justify-center items-center"><BsThreeDotsVertical/></div>
  </div>;
};

export default Coin;
