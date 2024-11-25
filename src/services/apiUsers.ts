import axios from "axios";
import { storage } from "../utils/helpers";

const BASE_URL = "https://90f2-197-210-53-172.ngrok-free.app/api/v1/users";

export type OwnedCatType = {
  catId: string;
  outputQuantityTime: number;
  numberOwned: number;
};

export type ReferralType = {
  name: string;
  earned: number;
  referralCode: string;
};

export interface IUser {
  name: string;
  telegramId: number;
  manxEarned: number;
  goldEarned: number;
  referrals: ReferralType[];
  referralCode: string;
  referredBy: string;
  ownedCats: OwnedCatType[];
  completedTasks: Array<string>;
  tickets: number;
}

async function getAllUsers() {
  const token = storage();
  try {
    const resp = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": true,
      },
    });
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
}

async function createGetUser({
  name,
  telegramId,
  referredBy,
}: {
  name: string;
  telegramId: number;
  referredBy: string;
}): Promise<IUser | undefined> {
  try {
    const resp = await axios.post(BASE_URL, {
      name,
      telegramId,
      referredBy,
    });
    console.log(resp);
    localStorage.setItem("manxcattoken", resp.data.token);
    if (resp.status == 202) {
      const data = await getUser(telegramId);
      console.log({ data });
      return data;
    }

    return resp.data.data;
  } catch (error) {
    console.log(error);
  }
}

async function getUser(telegramId: number): Promise<IUser> {
  const token = storage();
  const resp = await axios.get(`${BASE_URL}/${telegramId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });
  return resp.data.data;
}

type FarmType = {
  earned: number;
  ended: boolean;
  started: boolean;
  maxEarning: number;
  totalHrs: number;
};

async function farm(telegramId: number): Promise<FarmType> {
  const token = storage();
  const resp = await axios.post(
    `${BASE_URL}/farm/${telegramId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return resp.data;
}

async function startFarm(telegramId: number): Promise<FarmType> {
  const token = storage();
  const resp = await axios.post(
    `${BASE_URL}/farm/start/${telegramId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return resp.data;
}

async function claimFarmRewards(telegramId: number): Promise<FarmType> {
  const token = storage();
  const resp = await axios.post(
    `${BASE_URL}/farm/claim/${telegramId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return resp.data;
}

type DailyRewards = {
  currentDay: string;
  totalRewardsEarned: number;
};

async function updateDailyRewards(telegramId: number): Promise<DailyRewards> {
  const token = storage();
  const resp = await axios.post(
    `${BASE_URL}/daily/${telegramId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return resp.data;
}

async function resetDailyRewards(telegramId: number): Promise<DailyRewards> {
  const token = storage();
  const resp = await axios.post(
    `${BASE_URL}/daily/reset/${telegramId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return resp.data;
}

// auto farm
async function startAutoFarming(
  telegramId: number
): Promise<{ started: boolean; message: string }> {
  const token = storage();
  const resp = await axios.post(
    `${BASE_URL}/auto/start/${telegramId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return resp.data;
}

// get current status
async function getAutoFarmUpdate(
  telegramId: number
): Promise<{ started: boolean; message: string; earned: number }> {
  const token = storage();
  const resp = await axios.post(
    `${BASE_URL}/auto/${telegramId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return resp.data;
}

// spin
async function spinWheel(telegramId: number): Promise<{ prizeIndex: number }> {
  const token = storage();
  const resp = await axios.post(
    `${BASE_URL}/spin/${telegramId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return resp.data;
}

export {
  getAllUsers,
  createGetUser,
  farm,
  claimFarmRewards,
  startFarm,
  updateDailyRewards,
  resetDailyRewards,
  startAutoFarming,
  getAutoFarmUpdate,
  spinWheel,
};
