import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["ROLE_A", "ROLE_B"],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
 {
    timestamps: true
 });
export const User = mongoose.model("User", userSchema);
