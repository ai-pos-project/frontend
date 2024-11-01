import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ScanningProductPage from "./Forestage/ScanningPages/ScanningProductPage/ScanningProductPage.jsx";
import IdentifyPages from "./Forestage/ScanningPages/IdentfyPage/IdentifyPage.jsx";
import Cart from "./Forestage/Cart/Cart.jsx";
import PayMethodPage from "./Forestage/PayMethodPage/PayMethodPage.jsx";
import RegisterPage from "./Forestage/RegisterPage/RegisterPage.jsx";
import CreditSuccessPage from "./Forestage/PayMethodPage/SuccessCreditPage.jsx";
import LinePaySuccessPage from "./Forestage/PayMethodPage/SuccessLinePayPage.jsx";
import CheckoutPage from "./Forestage/CheckoutPage/CheckoutPage.jsx";
import LoginPage from "./Backstage/LoginPage/LoginPage.jsx";
import DashboardPage from "./Backstage/DashboardPage/DashboardPage.jsx";
import ProductPage from "./Backstage/ProductPage/ProductPage.jsx";
import MemberManagement from "./Backstage/MemberPage/MemberPage.jsx";
import PurchaseRecord from "./Backstage/RecordPage/RecordPage.jsx";
import ManagerRegisterPage from "./Backstage/ManagerRegisterPage/ManagerRegisterPage.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404</h1>,
  },
  {
    path: "/ScanningProduct",
    element: <ScanningProductPage />,
    errorElement: <h1>404</h1>,
  },
  {
    path: "/Identify",
    element: <IdentifyPages />,
    errorElement: <h1>404</h1>,
  },
  {
    path: "/Cart",
    element: <Cart />,
    errorElement: <h1>404</h1>,
  },
  {
    path: "/PayMethod",
    element: <PayMethodPage />,
    errorElement: <h1>404</h1>,
  },
  {
    path: "/Register",
    element: <RegisterPage />,
    errorElement: <h1>404</h1>,
  },

  {
    path: "/SuccessCredit",
    element: <CreditSuccessPage />,
    errorElement: <h1>404</h1>,
  },
  {
    path: "/SuccessLinePay",
    element: <LinePaySuccessPage />,
    errorElement: <h1>404</h1>,
  },
  {
    path: "/Checkout",
    element: <CheckoutPage />,
    errorElement: <h1>404</h1>,
  },

  {
    path: "/Login",
    element: <LoginPage />,
    errorElement: <h1>404</h1>,
  },
  {
    path: "/Dashboard",
    element: <DashboardPage />,
    errorElement: <h1>404</h1>,
  },
  {
    path: "/Product",
    element: <ProductPage />,
    errorElement: <h1>404</h1>,
  },
  {
    path: "/Member",
    element: <MemberManagement />,
    errorElement: <h1>404</h1>,
  },
  {
    path: "/Record",
    element: <PurchaseRecord />,
    errorElement: <h1>404</h1>,
  },
  {
    path: "/ManagerRegister",
    element: <ManagerRegisterPage />,
    errorElement: <h1>404</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
