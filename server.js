import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./src/config/database.js";
import userRoutes  from "./src/router/userRoutes.js";
import documentRoutes from "./src/router/documentRoutes.js";
import fileUpload from "express-fileupload";
// import signupRoutes from "./src/router/signup.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(fileUpload());

connectToDatabase();
app.use("/user", userRoutes);
app.use("/document", documentRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});