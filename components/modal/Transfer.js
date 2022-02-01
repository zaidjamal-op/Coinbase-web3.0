import React, { useEffect, useState } from 'react';
import { FaWallet } from 'react-icons/fa'
import imageUrlBuilder from '@sanity/image-url';
import {client} from '../../lib/sanity'

const Transfer = ({selectedToken, walletAddress, thirdWebTokens, setAction}) => {
    const [amount, setAmount] = useState('')
    const [recipient, setRecipient] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [activeThirdWebToken, setActiveThirdWebToken] = useState()
    const [balance, setBalance] = useState('Fetching...')

    useEffect(() => {
            const activeToken = thirdWebTokens.find(token => token.address === selectedToken.contractAddress)
            setActiveThirdWebToken(activeToken)
    }, [thirdWebTokens, selectedToken])

    useEffect(() => {
    
        const url = imageUrlBuilder(client).image(selectedToken.logo).url()
        setImageUrl(url)
    }, [selectedToken])

    useEffect(() => {
        const getBalance = async () => {
            const balance = await activeThirdWebToken.balanceOf(walletAddress)
            setBalance(balance.displayValue)
            
        }

        if (activeThirdWebToken) {
            getBalance()
        }
    },[activeThirdWebToken])

    const sendCrypto = async (amount, recipient) => {
        setAction('transferring')
        if(activeThirdWebToken && amount && recipient) {
                const tx = await activeThirdWebToken.transfer(
                    recipient, amount.toString().concat('000000000000000000')
                    
                )
                console.log(tx)
                setAction('transferred')
        } else {
            console.error('missing data')
        }
    }

  return <div className="flex flex-col h-full flex-1">
     <div className="flex flex-1 flex-col">
            <div className="flex flex-1 items-end">
                    <input type="number" className="border-hidden outline-none bg-transparent text-right max-w-[45%] mr-4 text-7xl text-[#3773f5]" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                    <span className="text-5xl text-[#3773f5] mb-4 ">{selectedToken.symbol}</span>
            </div>
            <div className={`${amount ? "text-[#0a0b0d]" : "text-[#8a919e]"} text-center pt-4 pb-8 text-xl`}>
                Amount is a required field
            </div>
     </div>
     <div className="grid grid-rows-2 w-full border border-[#5b7083] py-4 rounded-md">
         <div className="border-b border-[#5b7083] w-full flex justify-between items-center px-5 py-2">
             <h2 className="text-lg font-bold ml-4 mb-3">To</h2>
             <FaWallet className="text-lg ml-4 -mr-10 mb-3"/>
             <input className="placeholder:text-[#8a919e] bg-transparent border-hidden outline-none w-80 mr-3 -ml-4 text-lg mb-3" placeholder="Address" value={recipient} onChange={(e) => setRecipient(e.target.value)}/>
         </div>
         <div className="w-full h-full flex justify-between items-center px-5 py-2 hover:cursor-pointer" onClick={() => setAction('select')}>
         <h2 className="text-lg font-bold ml-4 mt-3">Pay with</h2>
         <img className="w-8 h-8 rounded-full mt-3" src={imageUrl}  />
         <div className="flex items-center justify-start w-80 mr-3 -ml-4 text-xl font-bold mt-3"><h1>{selectedToken.name}</h1></div>
         </div>
     </div>

     <div className="grid grid-rows-2 w-full py-4">
        <div>
        <button className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group w-full" onClick={() => sendCrypto(amount, recipient)}>
    <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
    
    <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
    
    <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
   
    <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
   
    <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
    <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
    <span className="relative font-bold text-xl">Continue</span>
</button>
        </div>
        <div className="w-full flex justify-between items-center py-2">
            <h2 className="mt-3 text-xl">{selectedToken.symbol} Balance</h2>
            <h2 className="mt-3 text-2xl mr-1">{balance} {selectedToken.symbol}</h2>
        </div>
     </div>
  </div>;
};

export default Transfer;
