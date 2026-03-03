import { createSlice } from "@reduxjs/toolkit"

const CurrentEditSlice =  createSlice({
    name: "currentEditItem",
    initialState:{ 
      currentEditItem: null
    },
    reducers:{
    setCurrentEditItem:(state,action) => {
    state.currentEditItem = action.payload
    }
}
})

export const {setCurrentEditItem} = CurrentEditSlice.actions
export default CurrentEditSlice.reducer
