import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { serverUrl } from "../App";
import Nav from "../components/nav";
const UserShopItem = () => {
  
  const [selectShopItem, setSelectShopItem] = useState([]);
  const location = useLocation();
  console.log("selected shop", location.state);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-shop-item/${location.state._id}`,
          {
            withCredentials: true,
          },
        );
        console.log("shop item>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", result.data);
        setSelectShopItem(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handelItemQuantity = (itemId) => {
    const updateQuantity = selectShopItem.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    setSelectShopItem(updateQuantity);
  };

  const handelreduceQuantity = (itemId) => {
    const updateQuantity = selectShopItem.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: (item.quantity || 1) - 1 };
      }
      return item
    });
    setSelectShopItem(updateQuantity);
    setQuantity(updateQuantity)
  };

  const handelAddToCart = async (item) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/cart/add-to-cart`,{
          productId: item._id,
          quantity: item.quantity || 1,
        },
        {
          withCredentials: true,
        },
      );
      console.log("Add to cart response:", response.data);
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-2.5 px-[150px]">
      <Nav />
      <h1 className="text-4xl font-bold pt-28">
        <span className="text-[#ff4c2d]">Welcome to</span>{" "}
        {location.state?.name} <span className="text-[#ff4c2d]">{"Shop"}</span>
      </h1>
      <p className="text-gray-500">
        {location.state?.city}, {location.state?.state}
      </p>
      <p className="text-gray-500">{location.state?.address}</p>
      <img
        src={location.state?.image}
        alt={location.state?.name}
        className="w-full h-[300px] border-amber-600 border rounded-2xl   object-cover rounded-lg mt-4"
      />
      <div>
        <p className="text-xl font-semibold pt-6">ITEM LIST</p>

        {selectShopItem.length === 0 ? (
          <div className="mt-4 justify-center items-center">
            {/* <img src={itemNotFoundImg} alt='No items available' /> */}
            <p className="text-gray-500">No items available for this shop.</p>
          </div>
        ) : (
          selectShopItem.map((item) => (
            <div
              key={item?._id}
              className="flex flex-wrap gap-4 items-center mt-4 bg-white shadow-lg rounded-2xl border border-amber-700  hover:shadow-xl transition-shadow duration-300 w-[500px] p-4"
            >
              <img
                src={item?.image}
                alt={item?.name}
                className="w-[100px] h-[100px] object-cover rounded-lg"
              />
              <div>
                <h2 className="text-lg font-bold">{item?.name}</h2>
                <p className="text-gray-500">{item?.description}</p>
                <p className="text-gray-500">{item?.category}</p>
                <p className="text-gray-500">Price: ${item?.price}</p>

                <div className="flex flex-row items-center gap-2 mt-2 space-x-[150px]">
                <p className="text-gray-500">Quantity:</p>
                <div className="flex flex-row items-center gap-2 mt-2">
                  <button
                    className="border border-black-300 rounded-md px-2 py-1 rotate-180"
                    onClick={() => handelItemQuantity(item?._id)}
                  >
                    +
                  </button>
                  <p className="text-gray-500">{item?.quantity || 1}</p>
                  <button
                    className="border border-black-300 rounded-md px-2 py-1 rotate-180"
                    onClick={() => handelreduceQuantity(item?._id)}
                  >
                    -
                  </button>
                </div>
                </div>
                <button onClick={()=> handelAddToCart(item)} className="text-[#ff4c2d] px-4 py-2 rounded-md mt-2 border border-amber-600  hover:bg-amber-700 transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserShopItem;
