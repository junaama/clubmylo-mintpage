import { useEthers } from "@usedapp/core";
import { useEffect } from "react";
import { useWallet } from "../hooks/connector";
import ConnectedWallet from "./ConnectedWallet";

const ConnectBtn = () => {
  const { activateBrowserWallet, account } = useEthers();
  const { wallets, connectedWallet, connect } = useWallet();

  useEffect(() => {
    localStorage.clear();
  }, []);
  console.log("Connected wallet: ", connectedWallet);
  return (
    <>
      {account ? (
        <ConnectedWallet />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => activateBrowserWallet()}
              className="relative border border-bs-red py-3 px-2 rounded-lg hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <div className="flex cursor-pointer items-center ">
                <div className="w-full ">Metamask</div>
                <div className="float-right h-10 w-10 py-1">
                  <img
                    src={wallets[0].image.src}
                    alt={wallets[0].name}
                    width={wallets[0].image.w}
                    height={wallets[0].image.h}
                  />
                </div>
              </div>
            </button>

            <button
              onClick={() => connect(wallets[1].connector)}
              className="relative border outline border-bs-red py-3 px-2 rounded-lg hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <div className="flex cursor-pointer items-center">
                <div className="w-full">WalletConnect</div>
                <div className="float-right w-10 h-10 py-2">
                  <img
                    src={wallets[1].image.src}
                    alt={wallets[1].name}
                    width={wallets[1].image.w}
                    height={wallets[1].image.h}
                  />
                </div>
              </div>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ConnectBtn;
