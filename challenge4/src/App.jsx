import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DetailMovie from "./DetailMovie";
import SearchMovie from "./Search";

import Homepage from "./Homepage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/search-movie",
      element: <SearchMovie />,
    },
    {
      path: "/detail-movie",
      element: <DetailMovie />,
    },
  ]);

  return <RouterProvider router={router} />;
}
