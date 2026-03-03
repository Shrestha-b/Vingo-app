import { createSlice } from "@reduxjs/toolkit"

const ItemSlice =  createSlice({
    name: "item",
    initialState:{ 
      myItemData: null
    },
    reducers:{
    setMyItemData:(state,action) => {
    state.myItemData = action.payload
    }
}
})

export const {setMyItemData} = ItemSlice.actions
export default ItemSlice.reducer
