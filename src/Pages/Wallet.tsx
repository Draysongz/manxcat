import React from "react"
import { Button, Image } from "@chakra-ui/react"
import ButtoN from "../components/ui/Button"
import { useState } from "react"
import ChooseExchange from "./ChooseExchange";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

interface Operations {
  name: string
}
const operations: Operations[] = [
  {
    name: "BUY"
  },
  {
    name: "WITHDRAW"
  },
  {
    name: "SWAP"
  },
]

const balances = [
  {
    coin: "MANX",
    desc: "Manx Token Coin",
    balance: "120,300.00",
    worth: "$5.90"
  },
  
  {
    coin: "TON",
    desc: "Toncoin",
    balance: "120,300.00",
    worth: "$5.90"
  }
]

const Wallet = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConnected] = useState<boolean>(true); // i removed 'setIsConnected to avoid errors because i didn't need the function'
  const toggle = () => setIsOpen((isOpen) => !isOpen)
  //const toggleConnect = () => setIsConnected((isOpen) => !isOpen)
  const userWallet = "YQXH........AQ8";

  return (
    <main className="page-style">
      {!isConnected? (<div className="flex flex-col items-center w-full mt-3">
        <Button 
          mb={3} 
          bgColor={'#EFD0CA'} 
          border={'3px solid #000807'} 
          borderRadius={'500px'} 
          w={'60%'} h={'36px'} 
          p={'16px 12px'} 
          gap={4} 
          fontSize={'12px'} 
          fontWeight={'400'} 
          cursor={"pointer"}
          onClick={toggle}
        >
          <p className={`text-center ${isOpen ? "mt-1" : ""}`}>
            {isOpen 
              ? "*************" 
              : "CONNECT WALLET"
            }
          </p>
          <Image src="/wallet.png"/>
        </Button>
        {isOpen ?
        (<>
          <ChooseExchange />
        </>) : (<>
          <div className="flex flex-col items-center gap-3">
            <img 
              src="/wallets/bigcoin.png" 
              alt="big coin"
              className="mt-10" 
            />
            <p className="text-4xl font-extrabold text-center">
              45,000
            </p>
            <p className="text-sm font-medium">
              $MANX & Tickets with Mystery Boxes
            </p>
            <ButtoN name="REDEEM USDT" />
          </div>
          <div className="flex justify-between items-center mt-7 w-full">
            <p className="font-medium text-xs">
              GET MORE GOLD COINS
            </p>
            <img 
              src="/clique-arrow.png" 
              alt="arrow"
              className="-rotate-90" 
            />
          </div>
        </>)}
      </div>) : (<>
        <div className="flex flex-col items-center w-full mt-3 gap-4">
          <div className="flex justify-between mb-3 w-full">
            <p className="text-base font-extrabold text-center mt-2">
              MY ASSETS
            </p>
              <Button 
                mb={3} 
                bgColor={'#EFD0CA'} 
                border={'3px solid #000807'} 
                borderRadius={'500px'} 
                w={'47.5%'} h={'36px'} 
                p={'16px 12px'} 
                gap={4} 
                fontSize={'12px'} 
                fontWeight={'400'} 
                cursor={"pointer"}
                onClick={toggle}
                >
                <Image src="/wallet.png"/>
                <p className={`text-center font-bold 
                  ${isOpen 
                  ? "mt-1" 
                  : ""}`}>
                  {userWallet}
                </p>
              </Button>
          </div>
          <div className="w-full">
            <div className="wallet-cards  px-6 py-7 flex flex-col gap-4">
              <div className="flex text-xs justify-between">
                <p className="text-[14px] ">Total Assets</p>
                <p className="text-[14px] underline">History</p>
              </div>
              <div className="flex items-center gap-[6px]">
              <h1 className="text-4xl font-extrabold">
                230.50
              </h1>
              <p className="mt-[6px]">USDT</p>
              </div>
              <div>
                <p>= 0.0000290BTC</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex gap-2 justify-center">
              {operations.map(({name}, id) => (
                <Link 
                  to={id === 0 ? "/buy" 
                    : id === 1 ? "/withdraw" 
                    : "/swap"} 
                    className="w-full"
                >
                  <div key={id} className="grid wallet-cards py-4 justify-center">
                  <img 
                    src={id === 0 
                      ? "/wallets/buy.png" 
                      : id === 1 
                      ? "/wallets/withdraw.png" 
                      : "/wallets/swap.png"} 
                    alt={name} 
                    className="bg-transparent place-self-center"
                  />
                  <p className="font-extrabold text-xs place-self-center">{name}</p>
                </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-base font-extrabold mt-2">
              BALANCES
            </p>
            <div className="w-full">
              {balances.map(({coin, desc, balance, worth}, id) => (
                <div key={id} className="cards flex justify-between p-4 my-3">
                  <div className="flex">
                    <div className="flex gap-2 items-center">
                      <div className="flex p-2 bg-[#EFD0CA] rounded-full justify-center">
                        <img 
                          src="/wallet.png" 
                          alt="wallet" 
                          className="xs:w-6 xs:h-6 xr:w-8 xr:h-7"
                        />
                        </div>
                        <div>
                          <p className="font-extrabold">{coin}</p>
                          <p className="text-[14px]">{desc}</p>
                        </div>
                      </div>
                  </div>
                  <div>
                    <p className="font-extrabold">{balance}</p>
                    <p className="text-xs">{worth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>)}
      <NavigationBar />
    </main>
  )
}

export default Wallet