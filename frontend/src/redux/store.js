import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import adimnUserSlice from "./slice/addUsersAdmin"
import taskSlice from "./slice/taskSlice"

// import clientSlice from "./components/redux/slice/clientSlice";


const store = configureStore({
 reducer:{
    user:authSlice,
    // client:clientSlice
    admin:adimnUserSlice,
    tasks:taskSlice

 }   
})
export default store;