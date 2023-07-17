const { Product } = require("../models");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const CustomErrorHandler = require("../services/CustomErrorHandler");
const Joi = require("joi");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    console.log("unique name >>>", uniqueName);
    // 7636734674367467-7778787887.png
    cb(null, uniqueName);
  },
});
const handleMultipartData = multer({
  storage: storage,
  limits: {
    fileSize: 1000000 * 5,
  }, // 5 mb
}).single("image");

const productController = {
  async store(req, res, next) {
    // It will be multipart data as we will get image from client and not json data

    handleMultipartData(req, res, async (err) => {
      if (err) {
        // return next(CustomErrorHandler.serverError(err.message))
        return res.json({ error: "Server error..." });
      }

      const filePath = req.file.path;
      console.log("filePath", filePath);
      // Validatation

      const productSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        size: Joi.string().required(),
      });
      const { error } = productSchema.validate(req.body);

      if (error) {
        // Delete the uploaded image if validation fails
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          // return next(CustomErrorHandler.serverError(err.message))
          if (err) {
            return next(err.message);
          }
        });
        return next(error);
      }

      // if (filePath.mimetype !== "image/png") {
      //   console.log("Invalid image ...");
      // }

      const { name, description, price, size } = req.body;
      let document;

      try {
        document = await Product.create({
          name,
          description,
          price,
          size,
          image: filePath,
        });
      } catch (err) {
        return next(err);
      }

      res.status(201).json(document);
    });
  },
  async update(req, res, next) {},
};
module.exports = productController;
