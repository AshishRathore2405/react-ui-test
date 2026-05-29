import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { User } from "../Types/Usertypes";

interface UserContextType {
  data: User[];
  setData: React.Dispatch<React.SetStateAction<User[]>>;

  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;

  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<User[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    const getList = async () => {
      try {
        setLoader(true);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("API Failed!");
        }

        const res: User[] = await response.json();

        setData(res);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoader(false);
      }
    };

    getList();

    return () => controller.abort();
  }, []);

  return (
    <UserContext.Provider
      value={{
        data,
        setData,
        loader,
        setLoader,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserState = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserState must be used inside UserProvider");
  }

  return context;
};
