import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null
}

const authSlice = createSlice({
    name:"Auth",
    initialState,
    reducers:{
        login : (state,action) => {
            state.status = true,
            state.userData = action.payload.userData
        },
        logOut : (state,action) => {
            state.status = false,
            state.userData = null
        }
    }
})

export default authSlice.reducer
 
export const {login,logOut} = authSlice.actions 