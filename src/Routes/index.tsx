import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { UserPage } from "../Component/UserPage";
import { UserForm } from "../Component/USerForm";

export const Routes = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <UserPage />,
    },
    {
      path: "form",
      element: <UserForm />,
    },
  ]);

  return <RouterProvider router={route} />;
};
