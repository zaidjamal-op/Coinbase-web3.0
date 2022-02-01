import React from 'react';
import { useWeb3 } from "@3rdweb/hooks"
import CoinbaseLogo from '../assets/cb-logo.png';
import Image from 'next/image';

const Login = () => {
  const { connectWallet } = useWeb3();
  return <div className="flex items-center justify-center bg-black max-w-full min-h-screen space-y-3">
    
 <div className="flex flex-col items-center justify-center">
 <div className="w-40 h-40">
      <Image src={CoinbaseLogo} alt="Coinbase"/>
    </div>
        <button onClick={() => connectWallet('injected')} className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
      <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#3773f5] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
      <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Connect Wallet</span>
  </button>
  <div className="text-center text-xl font-medium text-[#282b2f] mt-4">
    You need Chrome to be <br /> able to run this app.
  </div>
      </div>
  </div>;
};

export default Login;
