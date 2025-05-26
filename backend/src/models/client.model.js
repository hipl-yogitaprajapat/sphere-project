import mongoose from "mongoose";
const clientSchema = new mongoose.Schema(
    {
        projectname:{
            type:String,
        },
        description:{
            type:String,
        },
         priority:{
            type:String,
            enum:["high","medium","low"],
        },
    },
    { timestamps: true },
) 
const Client = mongoose.model("Client",clientSchema);
export default Client;
