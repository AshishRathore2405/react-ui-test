import { useNavigate } from "react-router-dom";
import { UserTable } from "./UserTable";
import { useUserState } from "../Context";

export const UserPage = () => {
  const { data, loader, error } = useUserState();

  const navigate = useNavigate();

  return (
    <div className="w-[100vw] grid place-content-center">
      {loader ? (
        <h1 className="my-3 border-2 p-2 text-center font-bold rounded-md">
          Loading..
        </h1>
      ) : error ? (
        <h1 className="my-3 border-2 p-2 text-center font-bold rounded-md">
          {error}
        </h1>
      ) : (
        <div>
          <button
            className="border-2 p-2 rounded-md cursor-pointer my-2"
            onClick={() => navigate("/form")}
          >
            Add
          </button>

          <UserTable userItem={data} />
        </div>
      )}
    </div>
  );
};
