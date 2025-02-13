import mongoose from "mongoose";
import { User } from "./user.js";

const documentSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
{
    timestamps: true
}
);

export const Document = mongoose.model("Document", documentSchema);