import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <div>Hello shopping cart</div>,
      },
      {
        path: "shop",
        element: <div>shop page</div>,
      },
      {
        path: "cart",
        element: <div>cart page</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
