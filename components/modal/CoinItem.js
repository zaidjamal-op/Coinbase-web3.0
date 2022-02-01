import { useEffect, useState } from "react";
import imageUrlBuilder from '@sanity/image-url';
import {client} from '../../lib/sanity'
import { FaCheck } from 'react-icons/fa'

const CoinItem = ({ sanityTokens, walletAddress, thirdWebTokens, token, selectedToken, sender, setAction, setSelectedToken}) => {

    const [balance, setBalance] = useState('Fetching...')
    const [imageUrl, setImageUrl] = useState(null)
    const [activeThirdWebToken, setActiveThirdWebToken] = useState()

    useEffect(() =>{
        const getBalance = async () =>{

           const activeThirdWebToken = thirdWebTokens.find(thirdWebToken => thirdWebToken.address === token.contractAddress)
           setActiveThirdWebToken(activeThirdWebToken)

            const balance = await activeThirdWebToken.balanceOf(sender)

            return setBalance(balance.displayValue.split('.')[0])
        }

        const getImageUrl = async () => {
            const imageUrl = imageUrlBuilder(client).image(token.logo).url()
            setImageUrl(imageUrl)
        }

        getImageUrl()
        getBalance()
    },[sender, thirdWebTokens])

    

  return <div className={`flex items-center p-4 rounded-md mb-1 hover:bg-[#0e0f14] ${selectedToken.name === token.name && "bg-[#141519]"}`} onClick={() =>{
      setSelectedToken(token) 
      setAction('send')
      }
      }>
        <div className="flex flex-1 items-center">
            <div className="mr-4 h-8 w-8 rounded-full ">
                <img src={imageUrl}/>
            </div>
            <div className="ml-3">
                <h2 className="text-xl">{token.name}</h2>
                <span className="text-xs text-[#797676]">{token.symbol}</span>
            </div>
        </div>
        <div>
            {balance} {token.symbol}
        </div>
        <div className="text-[#3773f5] p-2 text-xl">
                {Boolean(selectedToken.contractAddress === token.contractAddress) && (<FaCheck/>)}
        </div>
  </div>;
};

export default CoinItem;
