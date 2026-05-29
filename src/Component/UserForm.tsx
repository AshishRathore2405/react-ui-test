import { useState, type ChangeEvent } from "react";
import type { User } from "../Types/Usertypes";
import { useUserList } from "../Hook/UserHook";
import { useNavigate } from "react-router-dom";

const intialForm = {
  name: "",
  email: "",
  address: {
    city: "",
  },
  company: {
    name: "",
  },
};
export const UserForm = () => {
  const [formValue, setFormValue] = useState<User>(intialForm);
  const { addUser } = useUserList();
  const navigate = useNavigate()

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValue((pre) => {
      if (name === "company") {
        return {
          ...pre,
          company: {
            name: value,
          },
        };
      } else if (name === "city") {
        return {
          ...pre,
          address: {
            city: value,
          },
        };
      } else {
        return {
          ...pre,
          [name]: value,
        };
      }
    });
  };

  const submitForm = (e) => {
    e.preventDefault()
    if (
      !formValue.name.trim() ||
      !formValue.email.trim() ||
      !formValue.address.city.trim() ||
      !formValue.company.name.trim()
    ) {
      alert("All Field Are rquired!");
      return;
    }

    addUser(formValue);
    setFormValue(intialForm)
    navigate('/')
  };

  return (
    <div className="w-[100vw] h-[100vh] grid place-content-center">
      <form
        className="w-[400px] bg-gray-400 rounded-md  p-3"
        onSubmit={(e) => submitForm(e)}
      >
        <h1 className="text-center font-bold">User Form</h1>
        <div className="flex justify-between my-2">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="rounded-md border-2 p-2 pl-2"
            required
            onChange={($event) => handleInput($event)}
          />
        </div>
        <div className="flex justify-between my-2">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="rounded-md border-2 p-2 pl-2"
            required
            onChange={($event) => handleInput($event)}
          />
        </div>
        <div className="flex justify-between my-2">
          <label>City</label>
          <input
            type="text"
            name="city"
            className="rounded-md border-2 p-2 pl-2"
            required
            onChange={($event) => handleInput($event)}
          />
        </div>
        <div className="flex justify-between my-2">
          <label>Company</label>
          <input
            type="text"
            name="company"
            className="rounded-md border-2 p-2 pl-2"
            required
            onChange={($event) => handleInput($event)}
          />
        </div>
        <div className="flex justify-end my-2">
          <input type="submit" className="border-2 p-2 cursor-pointer" />
        </div>
      </form>
    </div>
  );
};
