import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Second from "./Second.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import 'tdesign-react/es/style/index.css'; // 少量公共样式

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/second", element: <Second /> },
], {basename: '/sub-react' });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

window.addEventListener('message', function (event) {
  console.log('react receive', event);
})