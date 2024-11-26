import React from "react";
import InviteButton from "../components/ui/InviteButton";
import { useUserContext } from "../context/UserContext";
import { useToast } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import { useTranslation } from "react-i18next";
import { initUtils } from "@telegram-apps/sdk";

interface InviteFriendsProps {
  bigcoin: string;
  smallcoin: string;
  heading: string;
  desc: string;
}


const Invites = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const referrals = user?.referrals;
  const invites = referrals?.length;
  const referralCode = user?.referralCode;
  const toast = useToast();


  const invitefriends: InviteFriendsProps[] = [
    {
      bigcoin: "/friends/bigcoin-friends.svg",
      heading: "invite friends",
      smallcoin: "/friends/smallcoin-friends.svg",
      desc: t("friends.reward"),
    },
    {
      bigcoin: "/friends/bigcoin-friends.svg",
      heading: "invite friends with telegram premium",
      smallcoin: "/friends/smallcoin-friends.svg",
      desc: t("friends.telegramPremium"),
    },
  ];

   const handleInviteFriend = () => {
     const utils = initUtils();
     const inviteLink = `https://t.me/manxcat_bot?start=${referralCode}`;
     const shareText = `Join me on this awesome Telegram mini app!`;
     const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
       inviteLink
     )}&text=${encodeURIComponent(shareText)}`;
     utils.openTelegramLink(fullUrl);
   };


 const handleCopy = async () => {
   try {
     if (navigator.clipboard) {
       await navigator.clipboard.writeText(
         `https://t.me/manxcat_bot?start=${referralCode}`
       );
     } else {
       // Fallback for older browsers
       const textArea = document.createElement("textarea");
       textArea.value = `https://t.me/manxcat_bot?start=${referralCode}`;
       document.body.appendChild(textArea);
       textArea.select();
       document.execCommand("copy");
       document.body.removeChild(textArea);
     }

     toast({
       title: t("friends.referralCopied"),
       colorScheme: "green",
       position: "top",
     });
   } catch {
     toast({
       title: t("friends.referralCopyError"),
       colorScheme: "red",
       position: "top",
     });
   }
 };

  return (
    <main className="apply_page-style">
      <div className="flex flex-col items-center px-5 space-y-3 mb-12">
        <div className="mt-5">
          <h1 className="text-center font-extrabold text-4xl mb-3 text-[#fefeff]">
            {t("friends.inviteTitle", { invites })}
          </h1>
          <p className="text-center text-sm font-bold">
            {t("friends.inviteDescription")}
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-3">
          {invitefriends.map(({ bigcoin, smallcoin, heading, desc }, id) => (
            <div
              key={id}
              className=" w-full flex px-2 xx:px-4 py-2 xx:py-3 bg-[#DAAEAB] gap-2 rounded-md"
            >
              <img src={bigcoin} alt="big coin" />
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-[10px] uppercase">{heading}</h1>
                <div className="flex gap-1 w-full">
                  <img src={smallcoin} alt="small coin" />
                  <p className="font-bold text-[10px]">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`items-center p-2 w-full 
          ${!invites ? "hidden" : "flex flex-col"}`}
        >
          <div className={`mt-4 w-screen px-2 flex flex-col`}>
            {referrals?.map(({ name, earned }, id) => (
              <div
                key={id}
                className="flex justify-between items-center bg-[#EFD0CA50] py-1 px-3 my-1 transition duration-1000"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={"/friends/gold-stack.png"}
                    alt={name}
                    className="w-8 h-auto rounded-full"
                  />
                  <p className="text-sm font-extrabold">{name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/friends/coin-friends.svg"
                    alt="coin"
                    className="w-6 h-auto"
                  />
                  <p className="text-sm font-extrabold">+{earned}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-4">
          <InviteButton name={t("friends.inviteButton")} className="" onClick={handleInviteFriend}/>
          <div
            className="bg-[#F15B061A] py-4 px-5 rounded-full border border-[#EB8A90]"
            onClick={handleCopy}
          >
            <img src="/friends/invite-icon.svg" alt="" />
          </div>
        </div>
      </div>
      <NavigationBar />
    </main>
  );
};

export default Invites;
