
import { useState, Fragment } from "react";
import ConnectBtn from "./ConnectButton";
import { Dialog, Transition } from "@headlessui/react"; 
import { useEthers } from "@usedapp/core";
import ConnectedWallet from "./ConnectedWallet";

const WalletModal = () => {
    const [isOpen, setIsOpen] = useState(false)
  const {account} = useEthers()
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

    return (
      <>
      <div className=" inset-0 flex items-center justify-center">
      {account ? <ConnectedWallet/> : ( <button
          type="button"
          onClick={openModal}
          className="bg-gradient-to-r from-pink-600 to-red-400 rounded-full uppercase tracking-wider p-4 text-sm hover:shadow-xl transform hocus:translate-x-px hocus:-translate-y-px focus:shadow-outline"
        >
          Connect
        </button>)}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto "
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 opacity-30 " />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                 {account ? "Connected" : "Connect Below"}
                </Dialog.Title>
                <div className="mt-2">
                  <ConnectBtn/>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="bg-gradient-to-r from-yellow-400 to-blue-400 rounded-full uppercase tracking-wider p-4 text-sm text-white hover:shadow-xl transform hocus:translate-x-px hocus:-translate-y-px focus:shadow-outline"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>

    )
}

export default WalletModal;