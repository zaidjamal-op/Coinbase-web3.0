import React, { useEffect, useState } from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs'
import {coins} from '../assets/coins'
import Coin from './Coin';

const Portfolio = ({walletAddress, sanityTokens, thirdWebTokens}) => {
    
    
  return <div className="flex flex-1 ml-0 xl:ml-4 py-5 justify-center max-w-screen-md xl:max-w-[860px]">
  
      <div className="mt-4 border border-[#282b2f] rounded-lg">
     
      <div className="p-8 border-b border-[#282b2f]">
        <div className="text-2xl font-semibold text-white">Your Assets</div>
      </div>
      
      <table className="w-full">
            <div className="p-8 border-b border-[#282b2f]">
                <tr className="grid grid-cols-5 gap-5 w-full text-white">
                    <div className="text-xs xl:text-lg">Name</div>
                    <div className="text-xs xl:text-lg">Balance</div>
                    <div className="text-xs xl:text-lg">Price</div>
                    <div className="text-xs whitespace-nowrap xl:text-lg">Allocation</div>
                    <div className="flex items-center justify-center text-xs xl:text-lg"><BsThreeDotsVertical/></div>
                </tr>
            </div>
            <div>
            {coins.map((coin) => (
                    <div className="border-b border-[#282b2f] text-xl text-white p-4">
                        <Coin coin={coin}/>
                    </div>
                ))}
            </div>
      </table>
  </div>
  </div>
};

export default Portfolio;
