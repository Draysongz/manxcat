import React from "react"
import ButtoN from "../components/ui/Button";
// import Loader from "../components/ui/Loader";
import { useDailyRewards } from "../hooks/useDailyRewards";
import { useTranslation } from "react-i18next";

interface Daily {
  day: string;
  tag: string;
  amount: number;
}



const DailySignIn = () => {
  const { t } = useTranslation(); 
  const {  claimDailyReward, totalEarned, currentDay } =
    useDailyRewards();

    const daily: Daily[] = [
      {
        day: t("dailySignIn.days[0]"), // Translation key for DAY 01
        tag: "day1",
        amount: 100,
      },
      {
        day: t("dailySignIn.days[1]"), // Translation key for DAY 02
        tag: "day2",
        amount: 120,
      },
      {
        day: t("dailySignIn.days[2]"), // Translation key for DAY 03
        tag: "day3",
        amount: 140,
      },
      {
        day: t("dailySignIn.days[3]"), // Translation key for DAY 04
        tag: "day4",
        amount: 160,
      },
      {
        day: t("dailySignIn.days[4]"), // Translation key for DAY 05
        tag: "day5",
        amount: 180,
      },
      {
        day: t("dailySignIn.days[5]"), // Translation key for DAY 06
        tag: "day6",
        amount: 200,
      },
      {
        day: t("dailySignIn.days[6]"), // Translation key for DAY 07
        tag: "day7",
        amount: 220,
      },
    ];

  // Handle claiming a new day
  const handleClaimed = async () => {
    await claimDailyReward();
  };

  
  return (
    <main className="apply_page-style">
      <div className="flex flex-col items-center mt-8 gap-8">
        <div className="text-center space-y-2 px-5">
          <h1 className="text-[33px] leading-8 font-extrabold">
            {t("dailySignIn.title")}
          </h1>
          <p className="font-semibold">{t("dailySignIn.reward")}</p>
        </div>
        <div className=" flex justify-between w-full">
          <div className="flex flex-col items-center px-5">
            <img src="daily-signin/reward-ticket.png" alt="" className="ml-4" />
            <p className="font-extrabold text-2xl">01</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="daily-signin/reward-coins.png"
              alt={t("dailySignIn.rewardAmount")}
              className="w-[120px]"
            />
            <p className="font-extrabold text-2xl">{totalEarned}</p>
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col w-full gap-6">
            <div className="w-full bg-[#EFD0CA80] p-3">
              <h1 className="uppercase text-[13px] font-bold text-center">
                {t("dailySignIn.checkInMessage")}
              </h1>
            </div>
            <div className="w-full px-5 grid grid-cols-2 gap-5">
              {currentDay &&
                daily.map(({ day, amount, tag }, id) => (
                  <div
                    key={id}
                    className={`daily-cards_container p-2 ${
                      id === 6 ? "col-span-2" : ""
                    } ${
                      // claimedDays.includes(id) ? "bg-[#EB8A90]" : "bg-[#EFD0CA80]"
                      tag < currentDay ? "bg-[#EB8A90]" : "bg-[#EFD0CA80]"
                    }`}
                    onClick={() => handleClaimed()}
                  >
                    <div className="daily-cards flex flex-col items-center py-[2px] px-1">
                      <p className="text-xs font-bold">{day}</p>
                      {tag < currentDay ? (
                        <>
                          <img
                            src="/daily-signin/claimed.png"
                            alt="reward coins"
                            className="w-16 h-auto"
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src="/daily-signin/reward-coins.png"
                            alt={t("dailySignIn.rewardAmount")}
                            className="w-16 h-auto"
                          />
                          <p className="text-xl font-extrabold">{amount}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <ButtoN
            name={t("dailySignIn.continue")}
            className="xs:mt-12 xx:mt-20"
            link={"/"}
          />
        </div>
      </div>
    </main>
  );
};

export default DailySignIn;
