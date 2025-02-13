import express from "express";
import jwt from "jsonwebtoken";

const authorizer = (req, res, next) => {

    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    }
    catch(error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};
export default authorizer;