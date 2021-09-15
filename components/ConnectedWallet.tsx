import {
    useEthers,
    shortenAddress,
    useEtherBalance,
    useLookupAddress,
  } from "@usedapp/core";
  import { formatEther } from "ethers/lib/utils";

  
  const ConnectedWallet = () => {
    const { account, deactivate } = useEthers();
    const etherBalance = useEtherBalance(account);
    const ens = useLookupAddress();
  
      return (
            <div className="flex flex-row align-center ">
              <div className="bg-yellow-400 text-black px-2 py-3 rounded-l-md ">
                {etherBalance && (
                  <p> {parseFloat(formatEther(etherBalance)).toFixed(3)} ETH </p>
                )}
              </div>
              <button
                onClick={() => deactivate()}
                className="relative border-none outline-none bg-black text-white px-2 py-3 rounded-r-md"
              >
                {ens ?? shortenAddress(String(account))}
              </button>{" "}
            </div>
          )
  }

  export default ConnectedWallet;