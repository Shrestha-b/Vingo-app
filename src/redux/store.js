import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import ownerSlice from "./ownerSlice"
import itemSlice from "./itemSlice"
import CurrentEditSlice from "./CurrentEditSlice"
import AllShopsSlice from "./allShopsSlice"
export const store = configureStore({
    reducer:{
        user: userSlice,
        owner: ownerSlice,
        item: itemSlice,
        currentEditItem : CurrentEditSlice,
        allShops: AllShopsSlice,

    }
})

