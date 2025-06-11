import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import adimnUserSlice from "./slice/addUsersAdmin"
import taskSlice from "./slice/taskSlice"
import commentSlice from "./slice/commentSlice"

const store = configureStore({
 reducer:{
    user:authSlice,
    admin:adimnUserSlice,
    tasks:taskSlice,
    comment:commentSlice

 }   
})
export default store;