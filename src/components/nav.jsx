import React, { useState } from "react";
import { FaLocationDot, FaS } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
function Nav() {
  const { userData, city } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentails: true,
      });
      dispatch(setUserData(null));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Vingo</h1>

      {showSearch && userData.role === "user" && (
        <div className="flex h-[70px]  md:w-[90%] lg:w-[40%]  bg-white shadow-xl rounded-lg items-center gap-[20px]">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-2 border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
          </div>

          <div className="w-full flex items-center gap-[10px] ">
            <FaSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search your delicious food..."
              className="w-full px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-[20px] ">
        {userData.role === "user" &&
          (showSearch ? (
            <FaSearch
              size={25}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(!showSearch)}
            />
          ) : (
            <RxCross2
              size={25}
              className="text-[#ff4d2d]  md:hidden"
              onClick={() => setShowSearch(!showSearch)}
            />
          ))}

        {userData.role === "user" && (
          <div className="relative cursor-pointer">
            <MdOutlineShoppingCart size={25} className="text-[#ff4d2d]" />
            <span className="absolute right-[-5px] top-[-12px] text-[#ff4d2d]">
              0
            </span>
          </div>
        )}

        {userData.role === "owner" && (
          <>
            {myShopData && (
              <>
                <button className="hidden md:flex flex-row px-3 py-1 items-center gap-1 p-2 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium" onClick={() => {}}>
                  <FaPlus size={12} className={"text-[#ff4d2d]"} />
                  <span>Add food Item</span>
                </button>
                <button className="hidden md:hidden flex-row px-3 py-1 items-center gap-1 p-2 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
                  <FaPlus size={12} className={"text-[#ff4d2d]"} />
                </button>
              </>
            )}
          </>
        )}

        <button className="relative hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
          My Order
          <span className="absolute justify-center items-center right-[-8px] top-[-12px] bg-[#ff4d2d] border rounded-3xl p-1 text-white">
            0
          </span>
        </button>

        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo(!showInfo)}
        >
          {userData?.fullName.slice(0, 1)}
        </div>

        {showInfo ? (
          <div className="fixed top-[80px] right-[10px] md:rigth-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">{userData.fullName}</div>
            <div className="md:hidden font-semibold cursor-pointer">
              My Orders
            </div>
            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogOut}
            >
              LogOut
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Nav;
