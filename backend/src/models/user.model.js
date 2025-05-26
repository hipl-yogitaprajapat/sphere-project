import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        name:{
            type:String,
        },
        firstName:{
            type:String,
        },
         lastName:{
            type:String,
        },
         company:{
            type:String,
        },
        password:{
            type:String,
        },
          image:{
            type:String,
        },
         role:{
            type:String,
            enum:["client","developer","designer","tester","admin"],
            default:"client"
        },
    },
    { timestamps: true },
) 
const User = mongoose.model("User",userSchema);
export default User;
