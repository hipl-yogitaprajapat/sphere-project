import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import adimnUserSlice from "./slice/addUsersAdmin"
// import clientSlice from "./components/redux/slice/clientSlice";


const store = configureStore({
 reducer:{
    user:authSlice,
    // client:clientSlice
    admin:adimnUserSlice

 }   
})
export default store;