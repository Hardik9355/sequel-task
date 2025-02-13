import express from "express";
import authorizer from "../middleware/authorizer.js";
import { getDocuments, uploadDocument } from "../controllers/document.js";
const router = express();
router.post("/upload", authorizer, uploadDocument);
router.get("/", authorizer, getDocuments);

export default router;