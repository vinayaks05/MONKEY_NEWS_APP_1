import mongoose from "mongoose";
// for saved cards
const userCard = new mongoose.Schema({
    Username: {type: String, unique: true},
    url: [],
});
const savedCards = mongoose.model("SavedCards", userCard);
export default savedCards;