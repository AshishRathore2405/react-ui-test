import { useMemo, useState } from "react";
import type { SortBy, SortOrder, User } from "../Types/Usertypes";

interface UserTableItem {
  userItem: User[];
}

interface Table {
  label: string;
  key: SortBy;
  order: SortOrder;
}
export const UserTable = ({ userItem }: UserTableItem) => {
  const [sort, setSort] = useState<SortBy>("name");
  const [order, setOrder] = useState<SortOrder>("asc");
  const cols: Table[] = [
    {
      label: "Name",
      key: "name",
      order: "asc",
    },
    {
      label: "Email",
      key: "email",
      order: "asc",
    },
    {
      label: "City",
      key: "address.city",
      order: "asc",
    },
    {
      label: "Company",
      key: "company.name",
      order: "asc",
    },
  ];

  const getSort = (path: string, data: User) => {
    return path.split(".").reduce((asc, key) => asc?.[key], data);
  };
  const userList = useMemo(() => {
    const orders = order === "asc" ? 1 : -1;

    return [...userItem].sort((a: User, b: User) => {
      const first = getSort(sort, a);
      const second = getSort(sort, b);

      return first.localeCompare(second) * orders;
    });
  }, [userItem, order, sort]);

  const hanldeClick = (header: string) => {
    setSort(header);
    setOrder((pre) => (pre === "asc" ? "desc" : "asc"));
  };
  return (
    <table className="w-[700px]">
      <thead>
        <tr>
          {cols?.map((item: Table) => (
            <th
              key={item.label}
              className="border-2 p-2 cursor-pointer"
              onClick={() => hanldeClick(item.key)}
            >
              {item.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {userList?.length === 0 ? (
          <tr>
            <td colSpan={4}>
              <h1 className="p-2 text-center border-2">No data found!</h1>
            </td>
          </tr>
        ) : (
          userList.map((item: User) => (
            <tr key={item.id}>
              <td className="border-2 p-2 text-center">{item.name}</td>
              <td className="border-2 p-2 text-center">{item.email}</td>
              <td className="border-2 p-2 text-center">{item.address.city}</td>
              <td className="border-2 p-2 text-center">{item.company.name}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
