import express from "express";
import fileUploadMiddleware from "../middlewares/multer.config.js";
import isUserAuthentic from "../middlewares/auth.js";
import { upload_file, get_file, all_files, delete_file, download_file, download_file_public } from "../controllers/file.control.js";


const router = express.Router();

router.get("/", (req, res) => {res.send("File Share API Server")});
router.post("/upload", isUserAuthentic, fileUploadMiddleware, upload_file);
// router.post("/upload", upload_file);
router.get("/files/all", isUserAuthentic, all_files);
router.get("/file/:shortUrl", get_file );
router.get("/download/:id", isUserAuthentic, download_file);
router.get("/download-public/:shortUrl", download_file_public);
router.delete("/file/:id", isUserAuthentic, delete_file);

export default router;

