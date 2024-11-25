import React, { useEffect, useState } from "react";
import "../index.css";
import {
  Box,
  Button,
  Flex,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import { useFarm } from "../hooks/useFarm";
import { useUserContext } from "../context/UserContext";
import Loader from "../components/ui/Loader";
import { useTranslation } from "react-i18next";
import { getAutoFarmUpdate, startAutoFarming } from "../services/apiUsers";

export default function Homepage() {
    const { t } = useTranslation();
  const {
    isLoading: initializing,
    manxEarned,
    id,
    setManxEarned,
    ownedCats,
  } = useUserContext();
  const {
    isLoading,
    startFarming,
    claimRewards,
    ended,
    totalHrs,
    maxEarning,
    earned,
    farming,
  } = useFarm();

  const [autoActive, setAutoActive] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCurrentAutoFarmStatus();
    }, 1000);

    async function getCurrentAutoFarmStatus() {
      try {
        const resp = await getAutoFarmUpdate(id);
        setManxEarned(resp.earned);
        setAutoActive(resp.started);
      } catch (error) {
        console.log(error);
        clearInterval(intervalId);
      }
    }

    return () => clearInterval(intervalId);
  }, [id, setManxEarned, autoActive]);

  async function startAuto() {
    if (autoActive) return;
    if (ownedCats.length == 0)
      return toast({
        title: t("homepage.buy_cat_message"),
        colorScheme: "orange",
        position: "top",
      });
    try {
      await startAutoFarming(id);
      setAutoActive(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (initializing) return <Loader />;
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgImage={"/background.png"}
      bgColor={"#EB8A90"}
      bgRepeat={"no-repeat"}
      bgPosition={"center"}
      bgSize={"cover"}
      height={"100vh"}
      alignItems={"center"}
    >
      <Flex
        width={"100%"}
        height={"100%"}
        flexDirection={"column"}
        pb={24}
        gap={5}
        alignItems={"center"}
      >
        <Header />
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            className="w-full gap-4 justify-center items-center"
          >
            <Flex className="bg-[#EB8A90] w-screen justify-around flex items-center py-2 px-1">
              <Box
                color={"#000807"}
                fontWeight={400}
                fontSize={"10px"}
                display={"flex"}
                textAlign={"center"}
              >
                <Link
                  to={"/daily-signin"}
                  className="flex flex-col items-center gap-1"
                >
                  <Image src="/calendar.png" />
                  <Text className="font-bold text-[9px]">
                    {t("homepage.daily_signin")}
                  </Text>
                </Link>
              </Box>
            
              <Box
                color={"#000807"}
                fontWeight={400}
                fontSize={"10px"}
                alignItems={"center"}
                display={"flex"}
                flexDirection={"column"}
              >
                <Box
                  className="flex flex-col items-center gap-1"
                  onClick={startAuto}
                >
                  <Image src="/console.png" />
                  <Flex align={"center"} gap={"1"}>
                    <Text className="font-bold text-[9px]">
                      {t("homepage.auto")}
                    </Text>
                    <Box
                      background={`${autoActive ? "green.500" : "gray.500"}`}
                      height={"2"}
                      width={"2"}
                      rounded={"full"}
                    ></Box>
                  </Flex>
                </Box>
              </Box>
            </Flex>
            <Box className="flex flex-col justify-center items-center gap-2">
              <Box className="w-max flex items-center justify-center gap-1">
                <Image src="/coin.png" />
                <Text className="text-2xl font-bold">
                  {manxEarned.toLocaleString()}
                </Text>
              </Box>
              <Link to={"/levels"}>
                <Box className="flex justify-center items-center gap-1">
                  <img src="/manx.png" className="w-6 h-6" alt="level 1 cat" />
                  <Text className="text-base font-bold">
                    {t("homepage.level")}
                  </Text>
                </Box>
              </Link>
            </Box>
            <Flex
              flexDirection={"row"}
              display={"flex"}
              className="border-[10px] border-[#EB8A90]  bg-[#EFD0CA] rounded-full p-5 justify-center items-center w-56 h-auto z-40"
            >
              <img src="/manx.png" className="w-44 h-40" alt="manx" />
            </Flex>
          </Box>
        </Box>
        <Box
          alignItems={"center"}
          display={"flex"}
          flexDirection={"column"}
          w={"100%"}
        >
          <Button
            mb={3}
            bgColor={"#EB8A90"}
            border={"3px solid #000807"}
            borderRadius={"500px"}
            w={"60%"}
            p={"16px 10px"}
            gap={4}
            fontSize={"12px"}
            fontWeight={"400"}
          >
            {t("homepage.watch_ads")}
            <Image src="/play.png" />
          </Button>
          {autoActive ? (
            <Button
              bgColor={"#EB8A90"}
              border={"3px solid #000807"}
              borderRadius={"500px"}
              w={"90%"}
              p={"16px 24px"}
              gap={4}
              fontSize={"12px"}
              fontWeight={"400"}
              disabled={autoActive}
            >
              {t("homepage.auto_farm_active")}
            </Button>
          ) : (
            <Button
              bgColor={"#EB8A90"}
              border={"3px solid #000807"}
              borderRadius={"500px"}
              w={"90%"}
              p={"16px 24px"}
              gap={4}
              fontSize={"12px"}
              fontWeight={"400"}
              disabled={ended ? false : farming}
              onClick={ended ? claimRewards : startFarming}
            >
              {isLoading ? (
                <Spinner />
              ) : farming ? (
                ended ? (
                  t("homepage.claim_rewards")
                ) : (
                  t("homepage.farming")
                )
              ) : (
                t("homepage.farm")
              )}
              {farming && (
                <>
                  <Text>
                    {earned?.toFixed(3)} of {maxEarning}
                  </Text>
                  <Text>{totalHrs && totalHrs * 60}MIN</Text>
                </>
              )}
            </Button>
          )}
        </Box>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
