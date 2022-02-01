import Image from 'next/image';
import React from 'react';
import CoinbaseSmallLogo from '../assets/coinbase-logo.png';
import SidebarLink from './SidebarLink';
import {AiOutlinePieChart,AiOutlinePlusCircle,
  AiOutlineGift} from 'react-icons/ai'
import {BiTrendingUp} from 'react-icons/bi'
import { RiCoinsLine, RiNotification3Line } from 'react-icons/ri'
import { MdWeb } from 'react-icons/md'
import { BsPersonPlus } from 'react-icons/bs'


const Sidebar = () => {
  return <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-3 fixed h-full">
<div className="flex items-center justify-center w-14 h-14 p-0 xl:ml-3">
  
   <div className="xl:hidden"><Image src={CoinbaseSmallLogo} alt={'Coinbase Logo'}/></div>
   <h1 className="hidden xl:flex text-[#3773f5] text-4xl ml-28 font-bold" >Coinbase</h1>
   
</div>

<div className="space-y-5 mt-4 mb-2.5 xl:ml-3">
<SidebarLink text="Assets" Icon={AiOutlinePieChart} active />
        <SidebarLink text="Trade" Icon={BiTrendingUp} />
        <SidebarLink text="Pay" Icon={RiCoinsLine} />
        <SidebarLink text="For You" Icon={MdWeb} />
        <SidebarLink text="Learn and Earn" Icon={AiOutlinePlusCircle} />
        <SidebarLink text="Notifications" Icon={RiNotification3Line} />
        <SidebarLink text="Invite Friends" Icon={BsPersonPlus} />
        <SidebarLink text="Send a gift" Icon={AiOutlineGift} />
</div>
  </div>;
};

export default Sidebar;
