import express from 'express'
import authController from './../controllers/authController.js';
import authMiddleware from './../middlewares/authMiddleware.js';

// router object
const router = express.Router()

// routing
// register
router.post("/register", authController.register)

// login
router.post("/login" ,authController.login)

// forgot password
router.post('/forgot-password', authController.forgotPassword)

// protected user route
router.get("/user-auth", authMiddleware.requireSignIn, (req, res) => {
     res.status(200).send({ok: true})
})

// protected admin route
router.get("/admin-auth", authMiddleware.requireSignIn, authMiddleware.isAdmin, (req, res) => {
     res.status(200).send({ok: true})
})

export default router