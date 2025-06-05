import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import adimnUserSlice from "./slice/addUsersAdmin"
import taskSlice from "./slice/taskSlice"
import commentSlice from "./slice/commentSlice"

// import clientSlice from "./components/redux/slice/clientSlice";

const store = configureStore({
 reducer:{
    user:authSlice,
    // client:clientSlice
    admin:adimnUserSlice,
    tasks:taskSlice,
    comment:commentSlice

 }   
})
export default store;