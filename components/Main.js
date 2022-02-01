import Portfolio from "./Portfolio";
import BalanceChart from './BalanceChart';
import { UserData } from '../ChartData'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { useWeb3 } from "@3rdweb/hooks"


const Main = ({walletAddress, sanityTokens, thirdWebTokens}) => {
  const { disconnectWallet, connectWallet } = useWeb3();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const router = useRouter();
  const [walletBalance, setWalletBalance] = useState(0)
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.month),
    datasets: [
      {
        label: "Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "#3773f5",
        borderWidth: 2,
      },
    ],
  })

    // convert Tokens to USD and
    const tokenToUSD = {}

    for (const token of sanityTokens) {
        tokenToUSD[token.contractAddress] = Number(token.usdPrice)
    }

    useEffect(() => {
        const calculateTotalBalance = async () => {
            const totalBalance = await Promise.all(
                thirdWebTokens.map(async (token) => {
                    const balance = await token.balanceOf(walletAddress)
                    return Number(balance.displayValue) * tokenToUSD[token.address]
                })
            )
    
            setWalletBalance(totalBalance.reduce((acc, balance)=> acc + balance, 0))
            
    
        }
        
        return calculateTotalBalance()
    }, [thirdWebTokens, sanityTokens])

  
  return <div className="flex-grow border-l border-r border-[#282b2f] max-w-4xl sm:ml-[73px] xl:ml-[300px]" >
      <div className="flex items-center justify-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-[#282b2f]">
      <h2 className="text-4xl mr-10 xl:text-5xl font-bold text-white">Assets</h2>
      <div className="flex items-center justify-center space-x-4">
        {walletAddress ? (
          <div className="border-2 border-gray-700 rounded-sm p-1 cursor-pointer" onClick={disconnectWallet}>
          <h4 className="text-[#26ad75]">Wallet Connected</h4>
          <div className="text-white">{walletAddress.slice(0,7)} ... {walletAddress.slice(35)}</div>
      </div>
        ) : (
          <button onClick={() => connectWallet('injected')} className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
          <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#3773f5] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Connect Wallet</span>
      </button>
        )}
      <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
      <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#3773f5] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
      <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white font-bold">Buy / Sell</span>
  </button>
 <Link href={'/?transfer=1'}>
 <button className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group" onClick={(e) => {
   e.stopPropagation();
   setIsOpen(true);
 }}>
    <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
    
    <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
    
    <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
   
    <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
   
    <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
    <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
    <span className="relative font-bold">Send / Receive</span>
</button>
 </Link>
      </div>
      </div>
      
     <div className="py-5">
     <div className=" px-5 py-5 max-w-md xl:max-w-[860px] ml-4 xl:ml-4 border border-[#282b2f] rounded-lg">
        <h1 className="text-[#5a5d61] text-base xl:text-xl py-2">Portfolio balance: <b className="text-white">{'$'} {walletBalance.toLocaleString()}</b></h1>
        <BalanceChart chartData={userData}/>
      </div>
      <Portfolio walletAddress={walletAddress} sanityTokens={sanityTokens} thirdWebTokens={thirdWebTokens}/>
     </div>
    
  </div>;
};

export default Main;
