import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  connectContractToSigner,
  useEthers,
  useContractFunction,
} from "@usedapp/core";
import { BigNumber, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import ABI from "../config/ABI.json";
import WalletModal from "../components/WalletModal";

const contractAddress = "0xaf6703b0eD58Efb1FfC2671f9eC556E40b5953e9";
const contractInterface = new utils.Interface(ABI);
const contract = new Contract(contractAddress, contractInterface);

const basePrice = {
  gold: 1,
  mylo: 0.15,
  rafo: 0.1,
  bredo: 0.07,
};

const Home: NextPage = () => {
  const { account, chainId, library } = useEthers();
  const [selectedGold, setGoldAmount] = useState<number>(1);
  const [selectedMylo, setMyloAmount] = useState<number>(1);

  const [selectedRafo, setRafoAmount] = useState<number>(1);
  const [selectedBredo, setBredoAmount] = useState<number>(1);

  let gasLimit: BigNumber;

  const { state, send } = useContractFunction(contract, "mint", {
    transactionName: "Mint",
  });
  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleMint = async (optionId: Number, price: Number, name: string) => {
    if (account === undefined) {
      alert("Connect to your wallet!");
      return;
    }
    if (chainId !== 1) {
      alert("Connect to the Ethereum mainnet!");
      return;
    }
    const signedContract = await connectContractToSigner(
      contract,
      undefined,
      library
    );
    try {
      gasLimit = await signedContract.estimateGas.mint(
        optionId,
        name === "gold"
          ? selectedGold
          : name === "mylo"
          ? selectedMylo
          : name === "rafo"
          ? selectedRafo
          : selectedBredo,
        account,
        { value: utils.parseEther(String(price)) }
      );
    } catch (error) {
      console.error(error);
    }
    send(
      optionId,
      name === "gold"
        ? selectedGold
        : name === "mylo"
        ? selectedMylo
        : name === "rafo"
        ? selectedRafo
        : selectedBredo,
      account,
      {
        value: utils.parseEther(String(price)),
        gasLimit: gasLimit.add(10_000),
      }
    );
  };

  return (
    <div className="m-auto p-5 bg-gray-900 text-white">
      <Head>
        <title>Club Mylo - Mint</title>
        <meta name="description" content="Mylo Club mint page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WalletModal />

      <div className="flex align-center justify-center mt-8">
        <Image src="/placeholder.jpg" width="900" height="500" />
      </div>

      <div className="flex flex-col justify-between lg:flex-row items-center lg:items-stretch relative h-2/3">
        <div className="w-full max-w-sm mt-16 lg:mr-8 lg:last:mr-0 text-center px-8 shadow relative pt-2 flex flex-col h-full">

          <div className="rounded-3xl shadow-orange-xl mb-4 has-tooltip">
            <div className="flex">
                <Image
              src="/gold-icon.png"
              width="320"
              height="320"
              className="transform hover:scale-90 transition duration-300"
            />
            </div>
            <span className="tooltip rounded shadow-lg p-2 bg-gray-800 text-white -mb-8 flex -ml-8" >Get Backstage Access and Meet and Greet Passes for You and 3 Friends to EVERY Event Hosted by DC Media and Otis Music Global</span>
          </div>

          <p className="text-2xl font-bold">Golden Set</p>
          <select
            style={{
              backgroundImage: "url(chevrondown.svg)",
              backgroundPositionX: "95%",
              backgroundPositionY: "center",
            }}
            onChange={(e) => {
              setGoldAmount(Number(e.target.value));
            }}
            defaultValue="1"
            className="border border-red-400 py-2 px-4 rounded-lg bg-transparent text-white outline-0 appearance-none bg-no-repeat m-4"
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
          <div className="text-center flex justify-center p-2">
            <p className="flex">
              {(1 * selectedGold).toFixed(2)}{" "}
              <Image
                src="/ethereum.svg"
                width="25"
                height="25"
                alt="Ethereum"
              />
            </p>
          </div>
          <button
            onClick={() => handleMint(0, basePrice.gold * selectedGold, "gold")}
            className="bg-gradient-to-r from-pink-600 to-red-400 rounded-full uppercase tracking-wider py-4 w-full text-sm hover:shadow-xl transform hocus:translate-x-px hocus:-translate-y-px focus:shadow-outline"
          >
            Mint
          </button>
        </div>

        <div className="w-full max-w-sm mt-16 lg:mr-8 lg:last:mr-0 text-center px-8 shadow relative pt-2 flex flex-col">
         <div className="rounded-3xl shadow-yellow-xl mb-4 has-tooltip">
           <div className="flex">
 <Image
              src="/mylo-icon.png"
              width="320"
              height="320"
              className="transform hover:scale-90 transition duration-300 "
            />
           </div>
           <span className="tooltip rounded shadow-lg p-2 bg-gray-800 text-white -mb-8 flex -ml-8" >Get TWO Preferred Access Tickets and Discounts to VIP to EVERY Event Hosted by DC Media and Otis Music Global</span>
          </div>
          <p className="text-2xl font-bold">Mylo Set</p>
          <select
            style={{
              backgroundImage: "url(chevrondown.svg)",
              backgroundPositionX: "95%",
              backgroundPositionY: "center",
            }}
            onChange={(e) => {
              setMyloAmount(Number(e.target.value));
            }}
            defaultValue="1"
            className="border border-red-400 py-2 px-4 rounded-lg bg-transparent text-white outline-0 appearance-none bg-no-repeat m-4"
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
          <div className="text-center flex justify-center p-2">
            <p className="flex">
              {(0.15 * selectedMylo).toFixed(2)}{" "}
              <Image
                src="/ethereum.svg"
                width="25"
                height="25"
                alt="Ethereum"
              />
            </p>
          </div>
          <button
            onClick={() => handleMint(2, basePrice.mylo * selectedMylo, "mylo")}
            className="bg-gradient-to-r from-pink-600 to-red-400 rounded-full uppercase tracking-wider py-4 w-full text-sm hover:shadow-xl transform hocus:translate-x-px hocus:-translate-y-px focus:shadow-outline"
          >
            Mint
          </button>
        </div>

        <div className="w-full max-w-sm mt-16 lg:mr-8 lg:last:mr-0 text-center px-8 shadow relative pt-2 flex flex-col">
        <div className="rounded-3xl shadow-pink-xl mb-4 has-tooltip">
          <div className="flex">
             <Image
              src="/rafo-icon.png"
              width="320"
              height="320"
              className="transform hover:scale-90 transition duration-300 "
            />
          </div>
          <span className="tooltip rounded shadow-lg p-2 bg-gray-800 text-white -mb-8 flex -ml-8" >Get ONE Preferred Access (Section of your choice) Ticket to EVERY Event Hosted by DC Media and Otis Music Global</span>
          </div>
          <p className="text-2xl font-bold">Rafo Set</p>
          <select
            style={{
              backgroundImage: "url(chevrondown.svg)",
              backgroundPositionX: "95%",
              backgroundPositionY: "center",
            }}
            onChange={(e) => {
              setRafoAmount(Number(e.target.value));
            }}
            defaultValue="1"
            className="border border-red-400 py-2 px-4 rounded-lg bg-transparent text-white outline-0 appearance-none bg-no-repeat m-4"
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
          <div className="text-center flex justify-center p-2">
            <p className="flex">
              {(0.1 * selectedRafo).toFixed(2)}{" "}
              <Image
                src="/ethereum.svg"
                width="25"
                height="25"
                alt="Ethereum"
              />
            </p>
          </div>
          <button
            onClick={() => handleMint(2, basePrice.rafo * selectedRafo, "rafo")}
            className="bg-gradient-to-r from-pink-600 to-red-400 rounded-full uppercase tracking-wider py-4 w-full text-sm hover:shadow-xl transform hocus:translate-x-px hocus:-translate-y-px focus:shadow-outline"
          >
            Mint
          </button>
        </div>

        <div className="w-full max-w-sm mt-16 lg:mr-8 lg:last:mr-0 text-center px-8 shadow relative pt-2 flex flex-col">
        <div className="rounded-3xl shadow-blue-xl mb-4 has-tooltip">

          <div className="flex">
              <Image
              src="/bredo-icon.png"
              width="320"
              height="320"
              className="transform hover:scale-90 transition duration-300 "
            />
          </div>
          <span className="tooltip rounded shadow-lg p-2 bg-gray-800 text-white -mb-8 flex -ml-8" >Get ONE General Admission Ticket to EVERY Event Hosted by DC Media and Otis Music Global</span>

          </div>
          <p className="text-2xl font-bold">Bredo Set</p>
          <select
            style={{
              backgroundImage: "url(chevrondown.svg)",
              backgroundPositionX: "95%",
              backgroundPositionY: "center",
            }}
            onChange={(e) => {
              setBredoAmount(Number(e.target.value));
            }}
            defaultValue="1"
            className="border border-red-400 py-2 px-4 rounded-lg bg-transparent text-white outline-0 appearance-none bg-no-repeat m-4"
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
          <div className="text-center flex justify-center p-2">
            <p className="flex">
              {(0.07 * selectedBredo).toFixed(2)}{" "}
              <Image
                src="/ethereum.svg"
                width="25"
                height="25"
                alt="Ethereum"
              />
            </p>
          </div>
          <button
            onClick={() =>
              handleMint(3, basePrice.bredo * selectedBredo, "gold")
            }
            className="bg-gradient-to-r from-pink-600 to-red-400 rounded-full uppercase tracking-wider py-4 w-full text-sm hover:shadow-xl transform hocus:translate-x-px hocus:-translate-y-px focus:shadow-outline"
          >
            Mint
          </button>
        </div>
      </div>

      <div className="flex align-center justify-center mt-10">
        <Image src="/placeholder.jpg" width="900" height="500" />
      </div>
    </div>
  );
};

export default Home;
