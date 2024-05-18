import mongoose from "mongoose";
const Schema = mongoose.Schema;
// firstname, lastname, email, password, phonenumber, postings: array, required : true
const sellerSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true },
    interested: { type: Array, required: true },
});
export default mongoose.model('Buyer', sellerSchema);