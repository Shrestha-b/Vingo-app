import express from "express";
import { addItem, editItem } from "../controllers/item.controllers.js";
// import { upload } from "../middleware/multer.js";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";

const itemRouter = express.Router();

itemRouter.post("/add-item",isAuth,upload.single("image"),addItem)
itemRouter.post("/edit-item/:itemId",isAuth,upload.single("image"),editItem)

export default itemRouter