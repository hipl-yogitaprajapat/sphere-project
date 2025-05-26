import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
// import clientSlice from "./components/redux/slice/clientSlice";


const store = configureStore({
 reducer:{
    user:authSlice,
    // client:clientSlice
 }   
})
export default store;