import imageUrlBuilder from '@sanity/image-url';
import {client} from '../../lib/sanity'
import { BiCopy } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Receive = ({setAction, walletAddress, selectedToken}) => {
    const [imageUrl, setImageUrl] = useState(null)
    const [copied, setCopied ] = useState(false)

    useEffect(() => {
    
        const url = imageUrlBuilder(client).image(selectedToken.logo).url()
        setImageUrl(url)
    }, [selectedToken])
  return <div className="grid grid-flow-row border border-gray-700 rounded-md">
      <div className="flex flex-1 justify-center items-center p-4 border-b border-gray-700 mb-2">
        <div>
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${walletAddress}`}/>
        </div>
      </div>
      <div className="flex items-center p-4 border-b border-gray-700 mb-2">
          <div className="flex flex-1 items-center ">
          <div className="mr-4 h-8 w-8 rounded-full ">
                <img src={imageUrl}/>
            </div>

            <div className="ml-3">
                <h2 className="text-xl">{selectedToken.name}</h2>
            </div>
          </div>
      </div>
      <div className="flex items-center p-4">
          <div className="flex flex-1 items-center ">
            <div className="ml-3">
                <h2 className="text-xl">{selectedToken.name} Address</h2>
                <span className="text-gray-500">{walletAddress}</span>
            </div>
            
          </div>
          <div className="w-8 h-8 hover:cursor-pointer hover:bg-gray-700 rounded-full flex justify-center items-center ml-5 xl:ml-16 text-xl"
            onClick={() =>{
              navigator.clipboard.writeText(walletAddress)
              setCopied(true)
            }}
          >
          {copied ? <FaCheck className="text-[#27ad75]"/> : <BiCopy/>}
          </div>
      </div>
  </div>;
};

export default Receive;
