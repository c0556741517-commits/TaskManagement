import { createSlice } from '@reduxjs/toolkit'

const initVal = {
   userFirstName: "",
   userLastName: "",
   userEmail: "",
   userMobileNumber: "",
   password: "",
   avatar: "",
   isConnected: false 
}

const loginSlice = createSlice({
    name: "login",
    initialState: initVal,
    reducers: {
        logIn: (state, action) => {
            state.userFirstName = action.payload.firstName;
            state.userLastName = action.payload.lastName;
            state.userEmail = action.payload.email;
            state.userMobileNumber = action.payload.mobileNumber;
            state.password = action.payload.password;
            state.avatar = action.payload.avatar;
            state.isConnected = true;
        },
        logOut: (state) => {
            state.userFirstName = "";
            state.userLastName = "";
            state.userEmail = "";
            state.userMobileNumber = "";
            state.password = "";
            state.avatar = "";
            state.isConnected = false;
        }
    }
})

export const { logIn, logOut } = loginSlice.actions
export default loginSlice.reducer