import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./src/config/database.js";
import userRoutes  from "./src/router/userRoutes.js";
import documentRoutes from "./src/router/documentRoutes.js";
// import signupRoutes from "./src/router/signup.js";
const app = express();
dotenv.config();
app.use(express.json());

connectToDatabase();

app.use("/user", userRoutes);
app.use("/document", documentRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});