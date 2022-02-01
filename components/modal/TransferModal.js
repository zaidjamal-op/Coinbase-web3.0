import {useState, useEffect} from 'react';
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from 'next/router';
import { ImCancelCircle } from 'react-icons/im'
import Transfer from './Transfer';
import CoinSelecter from './CoinSelecter';
import { BiTransfer } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa';
import Receive from './Receive';


const TransferModal = ({ sanityTokens, walletAddress, thirdWebTokens }) => {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const router = useRouter()
  const [action, setAction] = useState('send')
  const [selectedToken, setSelectedToken] = useState(sanityTokens[0])

  const selectedModal = option => {
    switch(option) {
      case 'send':
        return <Transfer selectedToken={selectedToken} setAction={setAction} walletAddress={walletAddress} thirdWebTokens={thirdWebTokens}/>
      case 'receive':
        return <Receive setAction={setAction} walletAddress={walletAddress} selectedToken={selectedToken}/>
      case 'select':
        return <CoinSelecter selectedToken={selectedToken} thirdWebTokens={thirdWebTokens} sanityTokens={sanityTokens} walletAddress={walletAddress} setAction={setAction} setSelectedToken={setSelectedToken}/>
      case 'transferring':
        return (
          <div className="w-full h-full grid place-items-center grid-flow-col text-4xl font-bolD">
            <h2 className="ml-28 animate-pulse">Transferring</h2>
            <BiTransfer className="animate-bounce mr-28 text-[#3773f5]"/>
          </div>
        )
      case 'transferred':
        return (
          <div className="w-full h-full grid place-items-center grid-flow-col text-4xl font-bold text-[#27ad75]">
            <h2 className="ml-28"> Transferred </h2>
            <FaCheck className="mr-28"/>
          </div>
        )
        
      default:
        return <h2>Send</h2>    
    }
  }

  return( <Transition.Root show={isOpen}>
  <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={() => {router.push('/'); setIsOpen(false)}}>
    <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <Transition.Child
        
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
      </Transition.Child>

      <Transition.Child
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div className="inline-block align-bottom bg-[#0a0b0d] rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
        <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/')
                  }}
                >
                  <ImCancelCircle className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex px-4 pt-3 pb-2.5 sm:px-6">
                  <div className="w-full">
                  <div className="flex justify-around items-center h-10 text-white">
                      <div className={`h-full w-full grid place-items-center text-lg font-semibold cursor-pointer hover:bg-[#111214] ${action === 'send' ? "text-[#3773f5]" : "border border-[#282b2f] rounded-sm"}`} onClick={() => setAction('send')}>
                      <p>Send</p>
                      </div>
                      <div className={`h-full w-full grid place-items-center text-lg font-semibold cursor-pointer hover:bg-[#111214] ${action === 'receive' ? "text-[#3773f5]" : "border border-[#282b2f] rounded-sm"}`}  onClick={() => setAction('receive')}>
                      <p>Receive</p>
                      </div>
                  </div>
                  </div>
              </div>
              <div className="flex-1 p-4 text-white">
                  {selectedModal(action)}
              </div>
        </div>
        
      </Transition.Child>
    </div>
  </Dialog>
</Transition.Root>

)
}

export default TransferModal;
