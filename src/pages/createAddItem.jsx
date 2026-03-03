import React, { useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function CreateAddItem() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.currentEditItem);
  console.log(data)
  const [namess, setName] = useState("");
  const [selectCate, setSelectCate] = useState("");
  const [categories, setCategories] = useState([
    "Snacks",
    "Main Course",
    "Desserts",
    "Pizza",
    "Burger",
    "Sandwiches",
    "South Indian",
    "Chinese",
    "Fast Food",
    "others",
  ]);
  const [pricess, setPrice] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [foodTypess, setFoodType] = useState(["veg", "non veg"]);
  const [imageFiless, setImageFile] = useState("");
  const [previewss, setPreview] = useState("");
const [EditItemId,setEditItemIs]  = useState("");
console.log("id>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",EditItemId)
  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>>>>",data)
    if (data.currentEditItem) {

      setName(data.currentEditItem.name ?? "");
      setPrice(data.currentEditItem.price ?? "");
      setSelectCate(data.currentEditItem.category ?? "");
      setSelectedFoodType(data.currentEditItem.foodType ?? "");
      setPreview(data.currentEditItem.image ?? "")
      setEditItemIs(data.currentEditItem._id)
    }
  }, [data.currentEditItem]);

  const handleFile = (e) => {
    const files = e.target.files[0];
    setImageFile(files);
    setPreview(URL.createObjectURL(files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDatas = new FormData();
      formDatas.append("name", namess);
      formDatas.append("category", selectCate);
      formDatas.append("price", pricess);
      formDatas.append("foodType", selectedFoodType);
      if(previewss) {
        formDatas.append("image", imageFiless);
      }
      const result = await axios.post(
        `${serverUrl}/api/item/add-item`,
        formDatas,
        { withCredentials: true },
      );
      console.log(result.data);
    } catch (error) {
      console.log("error>>>>>>>>>>>>", error);
    }
  };
  
  const handelEditItem = async (e) => {
     e.preventDefault();
    try {
      const formDatas = new FormData();
      formDatas.append("name", namess);
      formDatas.append("category", selectCate);
      formDatas.append("price", pricess);
      formDatas.append("foodType", selectedFoodType);
      if (previewss) {
        formDatas.append("image", imageFiless);
      }
      const result = await axios.put(
        `${serverUrl}/api/item/edit-item/${EditItemId}`,
        formDatas,
        { withCredentials: true },
      );
      console.log("edit Item datata  by shrestha",result.data);
    } catch (error) {
      console.log("errorEDIT ITEM error", error);
    }
  }


  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      <div className="fixed top-[20px] left-[20px] z-[10] mb-[10px]">
        <IoArrowBack
          size={25}
          className="text-[#ff4d2d]"
          onClick={() => navigate("/")}
        />
      </div>

      <div className={"flex justify-center items-center p-4 sm:p-6"}>
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex  flex-col items-center text-center text-center">
            <FaUtensils
              size={25}
              className="text-[#ff4d2d] mb-4 w-16 h-16 sm:w-20 sm:h-20 md-4"
            />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Add Item
            </h2>

            <form className="space-y-5" onSubmit={EditItemId ? handelEditItem : handleSubmit}>
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
                value={namess}
              />

              <label
                className="block mt-1 text-sm text-gray-600 flex font-normal mb-1"
                htmlFor="Enter category"
              >
                category
              </label>

              <select
                className="w-[400px] border rounded-lg px-3 py-2 focus:outline-none  focus:ring-orange-500 focus:ring-2"
                onChange={(e) => setSelectCate(e.target.value)}
                value={selectCate}
              >
                <option value="">Select </option>
                {categories.map((cate, index) => (
                  <option value={cate} key={index}>
                    {cate}
                  </option>
                ))}
              </select>

              <label
                className="block mt-1 text-sm text-gray-600 flex font-normal mb-1"
                htmlFor="Enter Price"
              >
                price
              </label>

              <input
                required
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                className="w-[400px] border rounded-lg px-3 py-2 focus:outline-none  focus:ring-orange-500 focus:ring-2"
                placeholder="Price"
                style={{ border: `solid 1px` }}
                value={pricess}
              />
              <div>

              <label className="block mt-1 text-sm text-gray-600 flex font-normal mb-1">
                  foodType
              </label>

                <select
                onChange={(e) => setSelectedFoodType(e.target.value)}
                className="w-[400px] border rounded-lg px-3 py-2 focus:outline-none  focus:ring-orange-500 focus:ring-2"
                value={selectedFoodType}
                >
                  <option value="">{"Select foodTypes" && selectedFoodType}</option>

                  {foodTypess.map((cate, index) => (
                    <option value={cate} key={index}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

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
                {previewss ? (
                  <img
                    src={previewss}
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

              <button className="rounded-full w-full items-center mt-4 justify-center bg-[#ff4d2d] text-white text-[18px] shadow-md cursor-pointer sm:p-3 px-2 py-2">
                {EditItemId ? "EditItem" : "AddNewItem"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAddItem;
