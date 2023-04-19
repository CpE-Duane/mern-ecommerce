import express from 'express'
import authMiddleware from './../middlewares/authMiddleware.js';
import categoryController from '../controllers/categoryController.js';

const router = express.Router()

// create category
router.post('/create-category',
     authMiddleware.requireSignIn,
     authMiddleware.isAdmin,
     categoryController.createCategory
)

// update category
router.put('/update-category/:id',
     authMiddleware.requireSignIn,
     authMiddleware.isAdmin,
     categoryController.updateCategory
)

// get all category
router.get('/get-categories', categoryController.getAllCategory
)

// get category
router.get("/get-category/:id", categoryController.getCategory)

// delete category
router.delete('/delete-category/:id',
     authMiddleware.requireSignIn,
     authMiddleware.isAdmin,
     categoryController.deleteCategory
)

export default router