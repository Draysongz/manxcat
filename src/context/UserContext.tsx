import React from "react";
import WebApp from "@twa-dev/sdk";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { createGetUser, OwnedCatType, IUser } from "../services/apiUsers";

type UserType = {
  name: string;
  id: number;
  coinsEarned: number;
  manxEarned: number;
  isLoading: boolean;
  ownedCats: OwnedCatType[];
  user: IUser | undefined;
  setCoinsEarned: Dispatch<SetStateAction<number>>;
  setName: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<number>>;
  setManxEarned: Dispatch<SetStateAction<number>>;

  tickets: number;
  setTickets: Dispatch<SetStateAction<number>>;
};

const userContext = createContext<UserType>({
  name: "",
  id: 0,
  coinsEarned: 0,
  isLoading: true,
  manxEarned: 0,
  ownedCats: [],
  user: undefined,
  setName() {},
  setId() {},
  setCoinsEarned() {},
  setManxEarned() {},

  tickets: 0,
  setTickets() {},
});

function UserContext({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [manxEarned, setManxEarned] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [ownedCats, setOwnedCats] = useState<OwnedCatType[]>([]);
  const [tickets, setTickets] = useState(0);
  const [user, setUser] = useState<IUser>();
  const [params] = useSearchParams();
  const referralId = params.get("referralId");

  useEffect(() => {
    const name = WebApp.initDataUnsafe.user?.first_name;
    const telegramId = WebApp.initDataUnsafe.user?.id;
    if (!name || !telegramId) {
      return console.log("Open mini app in telegram");
    }
    setName(name);
    setId(telegramId);
    const createGet = async () => {
      try {
        const data = await createGetUser({
          name,
          telegramId,
          referredBy: referralId || "",
        });
        if (data) {
          setCoinsEarned(data.goldEarned);
          setManxEarned(data.manxEarned);
          setOwnedCats(data.ownedCats);
          setTickets(data.tickets);
          setUser(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    createGet();
  }, [referralId]);

  return (
    <userContext.Provider
      value={{
        isLoading,
        name,
        id,
        coinsEarned,
        manxEarned,
        ownedCats,
        user,
        setName,
        setId,
        setCoinsEarned,
        setManxEarned,

        tickets,
        setTickets,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("out of user context");
  }
  return context;
}

export default UserContext;
