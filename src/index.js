import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SelectWords } from "./components/SelectWords";
import { RegularVerbs } from "./components/RegularVerbs";
import { ConfigProvider, Layout, theme } from "antd";
import { PresentSingle } from "./components/PresentSingle/PresentSingle";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/select",
    element: <SelectWords />,
  },
  {
    path: "/regelmassigWahl",
    element: <RegularVerbs />,
  },
  {
    path: "/presentSingle",
    element: <PresentSingle />,
  },
  {
    path: "/ver21",
    element: "2",
  },
  {
    path: "/verb3",
    element: "3",
  },
  {
    path: "/verb4",
    element: "4",
  },
  {
    path: "/verb5",
    element: "5",
  },
]);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
