import axios from "axios";
import { storage } from "../utils/helpers";

const BASE_URL = "https://8a67-105-112-184-143.ngrok-free.app/api/v1/cats";

export type CatType = {
  _id: string;
  name: string;
  imageUrl: string;
  level: number;
  price: number;
  outputQuantity: number;
  time: number;
  quaterlyAirdopValue: number;
  potion: string;
  feeDividend: number;
  maxPurchase: number;
};

async function getCats(): Promise<{ data: CatType[]; dataLength: number }> {
  const token = storage();
  const resp = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": true,
    },
  });
  return { data: resp.data.data, dataLength: resp.data.nbHits };
}

async function getCat(userId: number, catId: string): Promise<CatType> {
  const token = storage();

  const resp = await axios.get(`${BASE_URL}/${userId}/${catId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": true,
    },
  });
  return resp.data.data;
}

async function buyCat(userId: number, catId: string): Promise<string> {
  const token = storage();
  const resp = await axios.post(
    `${BASE_URL}/purchase/${userId}/${catId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return resp.data.message;
}

export { getCats, getCat, buyCat };
