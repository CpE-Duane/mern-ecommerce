
import Product from './../models/productModel.js';
import fs from 'fs'
import mongoose from 'mongoose';
import slugify from 'slugify'

const createProduct = async (req, res) => {
     try {
          const { name, description, price, category, quantity } = req.files;
          const { photo } = req.body;

          switch (true) {
               case !name:
                    return res.status(500).send({
                         success: false,
                         message: "Please enter product name.",
                    });
               case !description:
                    return res.status(500).send({
                         success: false,
                         message: "Please enter product description.",
                    });
               case !price:
                    return res.status(500).send({
                         success: false,
                         message: "Please enter product price.",
                    });
               case !category:
                    return res.status(500).send({
                         success: false,
                         message: "Please select a product category.",
                    });
               case !quantity:
                    return res.status(500).send({
                         success: false,
                         message: "Enter product quantity.",
                    });
               case photo && photo.size > 4000000:
                    return res.status(500).send({
                         success: false,
                         message: "Product photo is required and should be less than 4mb",
                    });
          }

          let product = {};

          if (photo) {
               const photoData = fs.readFileSync(photo.path);
               product.photo = {
                    data: photoData,
                    contentType: photo.type,
               };
          }

          product = await Product.create({
               ...req.fields,
               slug: slugify(name),
               photo: product.photo,
          });

          if (!product) {
               return res.status(500).send({
                    success: false,
                    message: "Product not added.",
               });
          }

          res.status(201).send({
               success: true,
               message: "Product added successfully.",
               product,
          });
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               message: "Error while adding product.",
               error,
          });
     }
};


const getProducts = async (req, res) => {
     try {
          const products = await Product.find({})
               .populate('category')
               .select("-photo")
               .limit(12)
               .sort({ createdAt: -1 })
          if (!products) {
               return res.status(404).send({
                    success: false,
                    message: "Products not found."
               })
          }

          res.status(200).send({
               success: true,
               message: "Products fetch successfully.",
               countTotal: products.length,
               products,

          })

     } catch (error) {
          res.status(500).send({
               success: false,
               message: "Error while getting products.",
               error
          })
     }
}

const getProduct = async (req, res) => {
     try {
          const { id } = req.params
          const product = await Product.findOne({ _id: new mongoose.Types.ObjectId(id) })
               .select("-photo")
               .populate("category")
          if (!product) {
               return res.status(404).send({
                    success: false,
                    message: "Product not found."
               })
          }

          res.status(200).send({
               success: true,
               message: "Product fetch successfully.",
               product
          })

     } catch (error) {
          res.status(500).send({
               success: false,
               message: "Error while getting product.",
               error
          })
     }
}

const getProductPhoto = async (req, res) => {
     try {
          const product = await Product.findById(req.params.pid).select("photo")
          if (product.photo.data) {
               res.set("Content-type", product.photo.contentType)
               return res.status(200).send(product.photo.data)
          } else {
               return res.status(404).send({
                    success: false,
                    mesage: "Photo not found."
               })
          }

     } catch (error) {
          res.status(500).send({
               success: false,
               message: "Error while getting product photo.",
               error
          })
     }
}

const deleteProduct = async (req, res) => {
     try {
          const { id } = req.params
          const product = await Product.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(id) }).select("-photo")
          if (!product) {
               return res.status(404).send({
                    success: false,
                    message: "Product not found."
               })
          }

          res.status(200).send({
               success: true,
               message: "Product deleted successfully."
          })
     } catch (error) {
          res.status(500).send({
               success: false,
               message: "Error while deleting product.",
               error
          })
     }
}

const updateProduct = async (req, res) => {
     try {
          const { name, description, price, category, quantity } = req.fields;
          const { photo } = req.files;
          const { id } = req.params

          switch (true) {
               case !name:
                    return res.status(500).send({
                         success: false,
                         message: "Please enter product name.",
                    });
               case !description:
                    return res.status(500).send({
                         success: false,
                         message: "Please enter product description.",
                    });
               case !price:
                    return res.status(500).send({
                         success: false,
                         message: "Please enter product price.",
                    });
               case !category:
                    return res.status(500).send({
                         success: false,
                         message: "Please select a product category.",
                    });
               case !quantity:
                    return res.status(500).send({
                         success: false,
                         message: "Enter product quantity.",
                    });
               case photo && photo.size > 4000000:
                    return res.status(500).send({
                         success: false,
                         message: "Product photo is required and should be less than 1mb",
                    });
          }

          let product = {};

          if (photo) {
               const photoData = fs.readFileSync(photo.path);
               product.photo = {
                    data: photoData,
                    contentType: photo.type,
               };
          }

          product = await Product.findByIdAndUpdate(id,
               {
                    ...req.fields,
                    slug: slugify(name)
               },
               { new: true }
          );

          if (!product) {
               return res.status(500).send({
                    success: false,
                    message: "Product not updated.",
               });
          }

          res.status(201).send({
               success: true,
               message: "Product updated successfully.",
               product,
          });
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               message: "Error while updating product.",
               error,
          });
     }
}

const productController = {
     createProduct,
     getProducts,
     getProduct,
     getProductPhoto,
     deleteProduct,
     updateProduct
}

export default productController