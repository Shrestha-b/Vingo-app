import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import useGetCity from "./hooks/useGetCity";
import CreateEditShop from "./pages/createEditShop";
import CreateAddItem from "./pages/createAddItem";
import useGetMyShop from "./hooks/useGetMyShop";
// import useGetItem from "./hooks/useGetItem";
import useGetAllShop from "./hooks/useGetAllShop";
import UserShopItem from "./pages/userShopItem";
import Cart from "./pages/cart";

export const serverUrl = "http://localhost:8000";
function App() {
  useGetCurrentUser();
  useGetCity();
  useGetMyShop();
  useGetAllShop();
  // useGetItem();
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to={"/signin"} />}
        ></Route>
        <Route
          path="/create-edit-shop"
          element={userData ? <CreateEditShop /> : <Navigate to={"/signin"} />}
        ></Route>
        <Route
          path="/create-edit-item"
          element={userData ? <CreateAddItem /> : <Navigate to={"/signin"} />}
        ></Route>
        <Route
          path="/User-Shop-Item"
          element={userData ? <UserShopItem /> : <Navigate to={"/signin"} />}
        ></Route>
        <Route
          path="/add-to-cart"
          element={userData ? <Cart /> : <Navigate to={"/signin"} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
