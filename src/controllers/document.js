import {Document} from "../models/document.js";
import fs from "fs";
import path from "path";
export const uploadDocument = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const fileKey = Object.keys(req.files)[0]; 
        const file = req.files[fileKey];
        const fileExt = path.extname(file.name);
        const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}${fileExt}`;
        const uploadDir = path.join("src", "uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const uploadPath = path.join(uploadDir, uniqueFilename);

        file.mv(uploadPath, async (err) => {
            if (err) {
                return res.status(500).json({ message: "File upload failed" });
            }

            const document = new Document({
                url: `/src/uploads/${uniqueFilename}`,
                createdBy: req.user?.userId, 
            });

            await document.save();

            res.status(201).json({ 
                message: "File uploaded successfully", 
                document 
            });
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};













export const getDocuments = async (req, res) => {
    try{
        const documents = await Document.find();
        res.status(200).json(documents);
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
};

export const approveDocument = async (req, res) => {
    try{
        const { documentId, approvedBy } = req.body;
        const document = await Document.findById(documentId);
        if(!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        document.status = "approved";
        document.approvedBy = approvedBy;
        await document.save();
        res.status(200).json({ message: "Document approved successfully" });
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
};