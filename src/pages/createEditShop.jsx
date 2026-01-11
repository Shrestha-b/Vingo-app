import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import axios from "axios";
import { setMyShopData } from "../redux/ownerSlice";
import { useEffect } from "react";
  function CreateEditShop() {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state, city, address , image} = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const [name, setName] = useState(myShopData?.name || "");
  const [addresss, setAddresss] = useState(myShopData?.address || address);
  const [citys, setCitys] = useState(myShopData?.city || city);
  const [states, setStates] = useState(myShopData?.state || state);
  const [imageFile, setImageFile] = useState(myShopData?.state || null);
  const [preview, setPreview] = useState(myShopData?.image || image);

  

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", citys);
      formData.append("state", states);
      formData.append("address", addresss);
      if(preview) {
        formData.append("image",imageFile);
      }
    const result = await axios.post(`${serverUrl}/api/shop/create-edit`,formData, { withCredentials: true })
    dispatch(setMyShopData(result.data))
      console.log("?????????????????????????????",result.data)
    } catch (error) {
      console.log("error>>>>>>>>>>>>",error)
    }
  };

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      <div
        className="fixed top-[20px] left-[20px] z-[10] mb-[10px]"
      >
        <IoArrowBack size={25} className="text-[#ff4d2d]" onClick={() => navigate("/")}/>
      </div>

      <div className={"flex justify-center items-center p-4 sm:p-6"}>
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex  flex-col items-center text-center text-center">
            <FaUtensils
              size={25}
              className="text-[#ff4d2d] mb-4 w-16 h-16 sm:w-20 sm:h-20 md-4"
            />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Edit Shop
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label
                className="block mt-1 text-sm text-gray-600 flex font-normal mb-1"
                htmlFor="Enter name"
              >
                Name
              </label>

              <input
                required
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="w-[400px] border rounded-lg px-3 py-2 focus:outline-none  focus:ring-orange-500 focus:ring-2"
                placeholder="EnterShop Name"
                style={{ border: `solid 1px` }}
                value={name}
              />
              <label
                className="block mt-1 text-sm text-gray-600 flex font-normal mb-1"
                htmlFor="Enter name"
              >
                Shop Image
              </label>
              <input
                required
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="w-[400px] border rounded-lg px-3 py-2 focus:outline-none  focus:ring-orange-500 focus:ring-2"
                placeholder="EnterShop Name"
                style={{ border: `solid 1px` }}
              />

              <div className="w-full border h-[220px] mt-6 rounded-lg px-3 py-2 focus:outline-none  focus:ring-orange-500 focus:ring-2">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <p>No Image</p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="">
                  <label
                    className="block mt-1 text-sm text-gray-600 flex font-normal mb-1"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    required
                    type="text"
                    onChange={(e) => setCitys(e.target.value)}
                    className="w-[180px] border rounded-lg px-3 py-2 focus:outline-none  focus:ring-orange-500 focus:ring-2"
                    placeholder="EnterShop Name"
                    style={{ border: `solid 1px` }}
                    value={citys}
                  />
                </div>

                <div className="">
                  <label
                    className="block mt-1 text-sm text-gray-600 flex font-normal mb-1"
                    htmlFor="Enter name"
                  >
                    State
                  </label>
                  <input
                    required
                    type="text"
                    onChange={(e) => setStates(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none  focus:ring-orange-500 focus:ring-2"
                    placeholder="EnterShop Name"
                    style={{ border: `solid 1px` }}
                    value={states}
                  />
                </div>
              </div>

              <label
                className="block mt-1 text-sm text-gray-600 flex font-normal mb-1"
                htmlFor="address"
              >
                Address
              </label>
              <input
                required
                type="text"
                onChange={(e) => setAddresss(e.target.value)}
                className="w-[400px] border rounded-lg px-3 py-2 focus:outline-none  focus:ring-orange-500 focus:ring-2"
                placeholder="EnterShop Name"
                style={{ border: `solid 1px` }}
                value={addresss}
              />

              <button className="rounded-full w-full items-center mt-4 justify-center bg-[#ff4d2d] text-white text-[18px] shadow-md cursor-pointer sm:p-3 px-2 py-2">
                Get Started
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEditShop;
