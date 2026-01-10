import Item from "../models/item.model.js";
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
      return res.status(400).json({ message: `shop not found ` });
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
    let itemId = req.params.itemId;
    const { name, category, price, foodType } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    item = await Item.find(
      itemId,
      {
        name,
        category,
        price,
        foodType,
        image,
      },
      { new: true }
    );
    if (!item) {
      return res.status(400).json({ message: `Item not found` });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: `editItem error: ${error}` });
  }
};
