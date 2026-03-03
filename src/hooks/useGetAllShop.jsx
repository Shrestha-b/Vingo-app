import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setAllShops } from "../redux/allShopsSlice";

function useGetAllShop() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/get-all`, {
          withCredentials: true,
        });
        dispatch(setAllShops(result.data))
        // console.log("all shops data",result.data)
      } catch (error) {
        console.log(" get all shops error ",error);
      }
    };
    fetchShop();
  }, []);
}

export default useGetAllShop;


