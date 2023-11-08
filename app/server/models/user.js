import mongoose from "mongoose";
// for user
const user = new mongoose.Schema({
    Username: {type: String, unique: true},
    Password: String,
    Url:{}
},
);
const User = mongoose.model("User", user);
export default User;