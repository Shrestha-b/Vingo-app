import express from "express";
import { addToCart } from "../controllers/cart.controller.js";

const cartRoute = express.Router();

// cartRoute.get("/read-cart",getCartItem)
cartRoute.post("/add-to-cart",addToCart)
// cartRoute.delete('/delete-cart-item',deleteFromCart)

export default cartRoute;

