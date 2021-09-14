import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { connectContractToSigner, useEthers, useContractFunction } from "@usedapp/core";
import { BigNumber, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import ABI from '../config/ABI.json';
import { useWallet } from "../hooks/connector";
const contractAddress = "0xaf6703b0eD58Efb1FfC2671f9eC556E40b5953e9"
const contractInterface = new utils.Interface(ABI)
const contract = new Contract(contractAddress, contractInterface)
const options = [
  {
    image: "/gold-icon.png",
    description:
      "Get Backstage Access and Meet and Greet Passes for You and 3 Friends to EVERY Event Hosted by DC Media and Otis Music Global",
    basePrice: 1,
    mintOption: 0,
  },
  {
    image: "/mylo-icon.png",
    description:
      "Get TWO Preferred Access Tickets and Discounts to VIP to EVERY Event Hosted by DC Media and Otis Music Global",
    basePrice: 0.15,
    mintOption: 1,
  },
  {
    image: "/rafo-icon.png",
    description:
      "desGet ONE Preferred Access (Section of your choice) Ticket to EVERY Event Hosted by DC Media and Otis Music Globalcription",
    basePrice: 0.1,
    mintOption: 2,
  },
  {
    image: "/bredo-icon.png",
    description:
      "Get ONE General Admission Ticket to EVERY Event Hosted by DC Media and Otis Music Global",
    basePrice: 0.07,
    mintOption: 3,
  },
];

const Home: NextPage = () => {
  const { activateBrowserWallet, account, chainId, library } = useEthers();
  const {wallets, connectedWallet, connect} = useWallet()
  const [selectedAmount, setSelectedAmount] = useState<number>(1);
  let gasLimit: BigNumber;

  const { state, send } = useContractFunction(contract, "mint", {
    transactionName: "Mint",
  });

  const handleMint = async (optionId: Number, price: Number) => {
    console.log(optionId);
    if(account === undefined){
      alert("Connect to your wallet!");
      return;
    }
    if(chainId !== 4){
      alert("Connect to the Ethereum mainnet!");
      return;
    }
    const signedContract = await connectContractToSigner(contract, undefined, library);
    try {
      gasLimit = await signedContract.estimateGas.mint(optionId, selectedAmount, account, {value: utils.parseEther(String(price))})
      console.log("gL: ", gasLimit)
    } catch (error) {
      console.error(error)
    }
    send(optionId, selectedAmount, account, {value: utils.parseEther(String(price)), gasLimit: gasLimit.add(10_000)})
  };

  return (
    <div className="m-auto p-5">
      <Head>
        <title>Club Mylo - Mint</title>
        <meta name="description" content="Mylo Club mint page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-center ">
        <button
          onClick={() => activateBrowserWallet()}
          className="border border-2 bg-red-200 p-2 rounded-lg"
        >
          Connect
        </button>
      </div>
      <div className="flex align-center justify-center">
        <Image src="/placeholder.jpg" width="900" height="500" />
      </div>

      <div className="flex flex-col w-1/2 flex-wrap">
        {options.map((option, i) => {
          return (
            <div key={i} className="flex flex-col flex-wrap m-10 ">
              <div className=" ">
                  <Image src={option.image} width="1024" height="1024"/>

                </div>
              <p>{option.description}</p>
              <select
                style={{
                  backgroundImage: "url(chevrondown.svg)",
                  backgroundPositionX: "85%",
                  backgroundPositionY: "center",
                }}
                onChange={(e) => setSelectedAmount(Number(e.target.value))}
                defaultValue={selectedAmount}
                className="border border-red-400 py-2 px-4 rounded-lg bg-transparent text-black outline-0 appearance-none bg-no-repeat mr-3"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <p>{option.basePrice * selectedAmount} ETH</p>
              <button
                onClick={() => handleMint(option.mintOption, option.basePrice * selectedAmount)}
                className="border border-2 bg-red-200 p-2 rounded-lg"
              >
                Mint
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex align-center justify-center">
        <Image src="/placeholder.jpg" width="900" height="500" />
      </div>
    </div>
  );
};

export default Home;
