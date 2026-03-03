import Nav from "./nav.jsx";
import { userImg } from "../utils/images.js";
import { useSelector } from "react-redux";
import {useNavigate}  from "react-router-dom";

function UserDashboard() {
const navigate = useNavigate(); 
  const allshops = useSelector((state) => state.allShops);

  console.log("all shop bhi aa gai",allshops)
  
  const handelShopData = (shop) => {
    // console.log("shop data",shop);
    navigate("/User-Shop-Item",{state:shop});
  }

  return (
    <div className="max-w-full mx-auto px-4 md:px-6 flex flex-col gap-4 items-center">
      <Nav />
      <div className="w-[700px] h-[500px] bg-white  overflow-hidden  shadow-lg rounded-2xl border transition-transform duration-300 hover:scale-105 border-amber-700  hover:shadow-xl transition-shadow duration-300">
        <svg
          src={userImg.headerContainerImg}
          alt="main containerImg"
          className="w-full h-full object-cover"
        >
          <h1 className="text-4xl font-bold text-center mt-20 z-10">Welcome to Vingo Food Web</h1>
        </svg>
      </div>

      {/* Shop List */}
      <p className="self-start text-3xl">Shops List</p>
    

      {allshops.allShops && allshops.allShops.map((shop) => 
        <div key={shop._id} onClick={() => handelShopData(shop)} className="flex flex-row flex-wrap gap-6 justify-center mt-20 overflow-hidden shadow-lg rounded-2xl border transition-transform duration-300 hover:scale-105 border-amber-700  hover:shadow-xl transition-shadow duration-300">
        <div className="p-5">
          <img
            src={shop?.image}
            alt="shop"
            className="w-[300px] h-[200px] object-cover rounded-lg"
          />
          <h2 className="text-xl font-bold mt-2">{shop?.name}</h2>
          <p className="text-gray-500 pl-1">{shop?.city}</p>
        </div>
      </div>
      )}
    </div>
  );
}

export default UserDashboard;
