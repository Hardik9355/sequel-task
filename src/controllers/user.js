import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        console.log("hii");
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user._id , role: user.role}, process.env.JWT_SECRET_KEY);
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ token });
    }
    catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
}
