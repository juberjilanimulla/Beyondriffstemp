import { Schema,model } from "mongoose";

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    mobileno:Number,
    address:String,
    state:String,
    country:String,

},{timestamps:true,
    versionKey:false
})

const usermodel = model("user",userSchema);
export default usermodel