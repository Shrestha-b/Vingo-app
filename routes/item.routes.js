import express from "express";
import { addItem, editItem ,getData, readItem} from "../controllers/item.controllers.js";
// import { upload } from "../middleware/multer.js";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";

const itemRouter = express.Router();

itemRouter.post("/add-item",isAuth,upload.single("image"),addItem)
itemRouter.get("/item-data/:shopId",isAuth,getData)
itemRouter.put("/edit-item/:itemId",isAuth,upload.single("image"),editItem)
itemRouter.get("/get-shop-item/:shopId",isAuth,upload.single("image"),readItem)

export default itemRouter