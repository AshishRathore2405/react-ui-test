import { useEffect, useState } from "react";
import type { User } from "../Types/Usertypes";

interface ReturnValue {
  data: User[];
  loader: boolean;
  error: string;
  addUser : (data:User) => void

}

export const useUserList = (): ReturnValue => {
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
          throw new Error("APi failed!");
        }
        const res: User[] = await response.json();

        setData(res);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        }
      } finally {
        setLoader(false);
      }
    };

    getList();
    return () => controller.abort();
  }, []);

  const addUser = (data:User)=>{
    setData((pre)=> [...pre,data])
  }

  return { data, loader, error ,addUser};
};
