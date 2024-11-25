import React, { useState, useCallback, ReactElement } from "react";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { Wheel } from "react-custom-roulette";
import { spinWheel } from "../services/apiUsers";
import { useUserContext } from "../context/UserContext";

import { useAdsgram } from "../hooks/useAdsgram";
import { ShowPromiseResult } from "../../adsgram";

const data = [
  { option: "MANX", prob: 8, prize: 2 },
  { option: "400", prob: 35, prize: 400 },
  { option: "USDT", prob: 2, prize: 1 },
  {
    option: "500",
    prob: 27,
    prize: 500,
  },
  {
    option: "image",
    image: { uri: "/coin.png", offsetY: 180, sizeMultiplier: 0.5 },
    prob: 5,
    prize: 4,
  },
  { option: "600", prob: 14, prize: 600 },
  { option: "700", prob: 5, prize: 700 },
  { option: "800", prob: 4, prize: 800 },
];

export default function Spinwheel() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const { id, tickets, setTickets, setCoinsEarned, setManxEarned } =
    useUserContext();

  const toast = useToast();

  const handleSpinClick = async () => {
    if (!mustSpin) {
      if (tickets == 0)
        return toast({
          title: "You do not have enough tickets",
          colorScheme: "orange",
          position: "top",
        });
      try {
        const resp = await spinWheel(id);

        const prize = data.find((_, index) => resp.prizeIndex == index);

        setPrizeNumber(resp.prizeIndex);
        setMustSpin(true);
        setTickets((curr) => curr - 1);
        if (prize?.option !== "USDT" && prize?.option !== "MANX") {
          setCoinsEarned((curr) => curr + Number(prize?.prize));
        }

        if (prize?.option == "MANX" || prize?.option == "image") {
          setManxEarned((curr) => curr + prize.prize);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      // bgGradient={"linear-gradient(360deg, #00283A 0%, #12161E 88.17%)"}
      width={"100vw"}
      minHeight={"100vh"}
      alignItems={"center"}
      textColor={"white"}
      overflowY={"hidden"}
    >
      <Flex
        width={"100%"}
        height={"100%"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        pt={5}
        gap={{ base: 5, sm: 14 }}
        overflowY={"hidden"}
      >
        <Box
          bg={
            "linear-gradient(225deg, #FEDC31 16%, #FDC448 22.31%, #FC8682 35.67%, #FA2CD7 53.31%, #987CDB 70.57%, #33D0E0 87.83%)"
          }
          mt={{ base: 0, sm: 14 }}
          display={"flex"}
          flexDirection={"column"}
          p={{ base: "4px", sm: "5px" }}
          borderRadius={"50%"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            bg={
              "linear-gradient(225deg, #000604 16%, #303030 44.62%, #000604 87.83%)"
            }
            p={{ base: "10px", sm: "20px" }}
            borderRadius={"50%"}
            // border={"4px solid #F8F9FD"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              textColors={["black"]}
              fontSize={32}
              backgroundColors={[
                "#FE7A18",
                "#FC9612",
                "#1A95FF",
                "#E60C6A",
                "#6010F5",
                "#00766B",
                "#9D9D9D",
                "#FE3E0E",
              ]}
              onStopSpinning={() => {
                setMustSpin(false);
              }}
            />
          </Box>
        </Box>
        <Button
          onClick={handleSpinClick}
          className="w-60 text-center flex items-center text-xl font-bold"
          bg={"#EB8A90"}
          boxShadow={"0px -2px 8px 0px #F8F9FD33 inset"}
          color={"#f5f5f5"}
          borderRadius={"20px"}
          _hover={{ bg: "#EB8A90", outline: "none" }}
        >
          Spin and Win!
        </Button>

        <div className="text-[#000807] flex flex-col items-center bg-[#EFD0CA80] w-full pb-4 gap-2">
          <p className="text-xs font-medium">AVAILABLE SPIN</p>
          <p className="text-xl font-extrabold">{tickets}</p>
          <p className="text-xs font-medium">WATCH ADS TO GET MORE SPINS</p>
          <ShowAdButton />
          {/* <p className="text-xs font-medium">4 of 5 videos watched</p> */}
        </div>
      </Flex>
    </Box>
  );
}

function ShowAdButton(): ReactElement {
  const onReward = useCallback(() => {
    alert("Reward");
  }, []);
  const onError = useCallback((result: ShowPromiseResult) => {
    alert(JSON.stringify(result, null, 4));
  }, []);

  /**
   * insert your-block-id
   */
  const showAd = useAdsgram({ blockId: "5536", onReward, onError });

  return (
    <Button
      bgColor={"#EFD0CA"}
      border={"4px solid #000807"}
      borderRadius={"500px"}
      w={"60%"}
      h={"16px"}
      p={"15px 10px"}
      fontSize={"12px"}
      fontWeight={"800"}
      onClick={showAd}
    >
      PLAY NOW
    </Button>
  );
}
