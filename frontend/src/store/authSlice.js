import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:null,
    status:false
};

const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login: (state,action) => {
            state.data = action.payload;
            state.status = true;
        },
        logout: (state) => {
            state.data = null;
            state.status = false;
        }
    }
});

export const {login,logout} = AuthSlice.actions;
export default AuthSlice.reducer;