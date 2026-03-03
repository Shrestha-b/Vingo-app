import Cart from "../models/cart.model.js";


export const addToCart = async(req,res) => {
try{
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [{ product: productId, quantity }],
        });
    } else {
        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId.toString());
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
    }
    return res.status(200).json(cart);
}catch(error){
    return res.status(500).json({message: `add-to-cart error from backend ${error}`});
}
}


//     const addToCart = req.body


//     }catch(error){
//         return res.status(500).json({message: `getCartItem  error from backend ${error}`});
//     }
// }

// export const deleteFromCart = async(req,res) => {
//     try{
//     const removeData = req.body


//     }catch(error){
//         return res.status(500).json({message: `deletefromCart error from backend ${error}`});
//     }
// }