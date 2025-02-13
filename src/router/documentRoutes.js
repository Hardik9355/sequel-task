import express from "express";
import authorizer from "../middleware/authorizer.js";
import { getDocuments, uploadDocument, approveDocument } from "../controllers/document.js";
const router = express();
router.post("/upload", authorizer, uploadDocument);
router.get("/", authorizer, getDocuments);
router.post("/approve", authorizer, approveDocument);

export default router;