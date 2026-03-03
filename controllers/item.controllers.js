import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";

export const addItem = async (req, res) => {
  try {
    const { name, category, price, foodType } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(400).json({ message: `shop not found` });
    }

    const item = await Item.create({
      name,
      shop,
      category,
      price,
      foodType,
      image,
      shop: shop._id,
    });
    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ message: `addItem error: ${error}` });
  }
};

export const editItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, category, price, foodType } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const updateData = {
      name,
      category,
      price,
      foodType,
    };

    if (image) {
      updateData.image = image;
    }

    const item = await Item.findByIdAndUpdate(
      itemId,
      updateData,
      { new: true }, // updated item return karega
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({
      message: `editItem error: ${error.message}`
    });
  }
};


export const getData = async (req,res) => {
  try {
    const id = req.params.shopId 
    const item = await Item.find({ shop: id })

    return res.status(200).json(item);
  } catch (error) {
    return  res.status(500).json({message: `shop data is not fetched: ${error}`}) 
  }
}

export const readItem = async (req, res) => {
  try {
    const id = req.params.shopId
    const items = await Item.find({ shop: id })

    return res.status(200).json(items)

  } catch (error) {
    return res.status(500).json({
      message: `Select shop data not fetched: ${error.message}`
    })
  }
}

