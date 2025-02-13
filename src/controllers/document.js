import {Document} from "../models/document.js";
import multer from "multer";
import path from "path";
export const uploadDocument = async (req, res) => {
    try{
      console.log(req);
        // const document = new Document({ url:  });
        await document.save();
        res.status(201).json({message: "Document uploaded successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});   

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