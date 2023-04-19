import express from 'express'
import authMiddleware from './../middlewares/authMiddleware.js';
import productController from '../controllers/productController.js';
import formidable from 'express-formidable'

const router = express.Router()

// create product
router.post("/create-product",
     authMiddleware.requireSignIn,
     authMiddleware.isAdmin,
     formidable(),
     productController.createProduct
)

// get products
router.get("/get-products", productController.getProducts)

// get product 
router.get("/get-product/:id", productController.getProduct)

// get photo
router.get("/product-photo/:pid", productController.getProductPhoto)

// delete product
router.delete("/delete-product/:id",
     authMiddleware.requireSignIn,
     authMiddleware.isAdmin,
     productController.deleteProduct
)

// update-product
router.put("/update-product/:id",
     authMiddleware.requireSignIn,
     authMiddleware.isAdmin,
     formidable(),
     productController.updateProduct
)

export default router