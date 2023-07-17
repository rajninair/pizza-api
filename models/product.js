const mongoose = require("mongoose");
const { APP_URL } = require("../config");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      get: (image) => {
        // image : uploads/544545-4455.png
        return `${APP_URL}/${image}`;
      },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    id: false,
  }
);

const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
