import mongoose from "mongoose";
// for saved cards
const userCard = mongoose.Schema({
    _id: String,
    name: String,
    url: [String],
});
const ShowUserCard = mongoose.model("ShowUserCard", userCard);
export default ShowUserCard;