import axios from "axios";
import { storage } from "../utils/helpers";

const BASE_URL = "https://ae7f-102-89-45-111.ngrok-free.app/api/v1/tasks";

export type TaskType = "telegram" | "twitter" | "web" | "others";

export interface ITask {
  _id: string;
  title: string;
  type: TaskType;
  reward: number;
  url: string;
  imagePath?: string;
}

async function getAllTasks() {
  const token = storage();

  const resp = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(resp.data);
  return resp.data.data;
}

async function completeTask(userId: number, taskId: string) {
  const token = storage();

  const resp = await axios.post(
    `${BASE_URL}/complete/${userId}/${taskId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(resp.data);
  return resp.data;
}

export { getAllTasks, completeTask };
