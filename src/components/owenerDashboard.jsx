import React from "react";
import Nav from "./nav.jsx";
import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
function OwenerDashboard() {
  const navigate = useNavigate();
    const { myShopData } = useSelector((state) => state.owner);
      console.log((JSON.stringify(myShopData, null, 2)));

  return (
    <div className="w-full  min-h-screen bg-[#fff9f6] flex flex-col items-center">
      <Nav />
      {!myShopData && (
        <div className={"flex justify-center items-center p-4 sm:p-6"}>
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center text-center">
              <FaUtensils
                size={25}
                className="text-[#ff4d2d] mb-4 w-16 h-16 sm:w-20 sm:h-20 md-4"
              />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Add your Restaurant
              </h2>
              <p className="text-xl sm:text-base font-bold text-gray-600 mb-4">
                join our food delivery platform and reach thousands of hungry
                customers every day.
              </p>

              <button className="rounded-full items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-md cursor-pointer sm:p-6 px-2 py-2" onClick={()=> navigate("/create-edit-shop")}>Get Started</button>
            </div>

          </div>  
        </div>
      )}

      {myShopData && 
          <div className="felx flex-col justify-center items-center gap-6 px-6 sm:px-6 mt-20">
              <h1 className="text-2xl sm:text-3xl justify-center text-gray-900 flex items-center gap-3 mt-8 text-center" >
                <FaUtensils
                size={25} 
                className="text-[#ff4d2d] mb-4 w-16 h-16 sm:w-20 sm:h-20 md-4"
               />Welcome to {myShopData.name}</h1> 

               <div className="bg-white shadow-lg rounded-xl bg-amber-700 overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative">
                <div className="absolute cursor-pointer bg-[#ff4d2d] rounded-full items-center justify-center m-2 p-2" onClick={()=>{navigate("/create-edit-shop")}}><FaRegEdit className="text-white" size={25}/></div>
                <img src={myShopData.image} alt={myShopData.name} className="w-full h-48 sm:h-64 object-cover" />
                <div className="p-4 sm:p-6">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{myShopData.name}</h1>
                  <p className="text-gray-500">{myShopData.city},{myShopData.state}</p>
                  <p className="text-gray-500 mb-4" >{myShopData.address}</p>
                </div>  
              </div>

          </div>
      }

    </div>
  );
}

export default OwenerDashboard;
