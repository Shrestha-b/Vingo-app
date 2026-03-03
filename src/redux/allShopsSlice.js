import { createSlice } from "@reduxjs/toolkit";

const AllShopsSlice = createSlice({
    name: "allShops",
    initialState: {
        allShops: null
    },

    reducers: {
        setAllShops: (state, action) => {
            state.allShops = action.payload
        }
    }})

export const {setAllShops} = AllShopsSlice.actions;
export default AllShopsSlice.reducer;