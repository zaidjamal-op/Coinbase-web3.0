import React, { useEffect, useState } from 'react';
import Main from '../components/Main';
import Promo from '../components/Promo';
import Sidebar from '../components/Sidebar';
import { ThirdwebSDK } from '@3rdweb/sdk';
import { ethers } from 'ethers';
import { useRouter } from 'next/router'
import Link from 'next/link'
import TransferModal from '../components/modal/TransferModal';
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";



const sdk = new ThirdwebSDK (
    new ethers.Wallet(
        process.env.NEXT_PUBLIC_METAMASK_KEY,
        ethers.getDefaultProvider(
            'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
        )
    )
)



const Dashboard = ({address}) => {
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const router = useRouter()
  const [sanityTokens, setSanityTokens] = useState([])
    const [thirdWebTokens, setThirdWebTokens] = useState([])
    useEffect(() => {
        const getSanityAndThirdWebTokens = async () => {
           
                const coins = await fetch("https://xmbp0gtl.api.sanity.io/v1/data/query/production?query=*%5B_type%20%3D%3D%20'coins'%20%5D%20%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%0A%7D")
                const SanityTokens = (await coins.json()).result
                setSanityTokens(SanityTokens)

                setThirdWebTokens(
                    SanityTokens.map(token => sdk.getTokenModule(token.contractAddress))
                )
           
        }
        return getSanityAndThirdWebTokens()
    }, [])

    //console.log('sanity tokens ➡', sanityTokens)
    //console.log('thirdWeb tokens ➡', thirdWebTokens)

  return (
      <main className="bg-[#0a0b0d] min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar/>
        <Main walletAddress={address} sanityTokens={sanityTokens} thirdWebTokens={thirdWebTokens}/>
        <Promo/>
        {isOpen && <TransferModal sanityTokens={sanityTokens} walletAddress={address} thirdWebTokens={thirdWebTokens}/>}
      </main>
  )
};

export default Dashboard;
