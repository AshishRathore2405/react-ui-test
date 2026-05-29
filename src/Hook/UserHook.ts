import type { User } from "../Types/Usertypes";
import { useUserState } from "../Context";

interface ReturnValue {
  addUser: (data: User) => void;
}

export const useUserList = (): ReturnValue => {
  const { setData } = useUserState();

  const addUser = (data: User) => {
    setData((prev) => [...prev, data]);
  };

  return { addUser };
};
