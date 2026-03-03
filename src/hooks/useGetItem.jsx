import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMyItemData } from "../redux/itemSlice";
import { serverUrl } from "../App";

function useGetItem() {
  const dispatch = useDispatch(); // ✅ top level
  const { myShopData } = useSelector((state) => state.owner);

  // console.log("my shop data in useGetItem", myShopData._id)
  useEffect(() => {
    if (!myShopData?._id) return;
    const getItems = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/item-data/${myShopData._id}`,
          { withCredentials: true }
        );
        dispatch(setMyItemData(result.data));
        console.log("addItem data:", result.data);
      } catch (error) {
        console.log("Item Error:", error.response?.data || error.message);
      }  
    };
getItems()
  }, [dispatch, myShopData?._id]);
}

export default useGetItem;
