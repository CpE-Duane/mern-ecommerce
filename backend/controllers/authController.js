import User from './../models/userModel.js';
import authHelper from './../helpers/authHelper.js';
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
     try {
          const { name, email, password, phone, address } = req.body

          if (!name || !email || !password || !phone || !address) {
               return res.send({ error: "All fields are required." })
          }

          const existingUser = await User.findOne({ email })
          if (existingUser) {
               return res.status(200).send({
                    success: false,
                    message: "Already registered please login."
               })
          }

          const hashedPassword = await authHelper.hashPassword(password)
          const user = await User.create({
               name,
               email,
               phone,
               address,
               password: hashedPassword
          })

          res.status(201).send({
               success: true,
               message: "Registered Successfully",
               user: user
          })

     } catch (error) {
          console.log(error)
          res.status(500).send({
               success: false,
               message: "Error in Registration.",
               error: error
          })
     }
}

const login = async (req, res) => {
     try {
          const { email, password } = req.body
          if (!email || !password) {
               return res.status(404).send({
                    success: false,
                    message: "All fields are required."
               })
          }

          const user = await User.findOne({ email })
          if (!user) {
               return res.status(400).send({
                    success: false,
                    message: "Invalid email or password."
               })
          }

          const match = await authHelper.comparePassword(password, user.password)
          if (!match || !user) {
               return res.status(400).send({
                    success: false,
                    message: "Invalid email or password."
               })
          }

          const token = await jwt.sign(
               { _id: user._id },
               process.env.JWT_SECRET,
               { expiresIn: "7d" }
          )

          res.status(200).send({
               success: true,
               message: "Login successfully.",
               user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    role: user.role
               },
               token: token
          })

     } catch (error) {
          console.log(error)
          res.status(500).send({
               success: false,
               message: "Error in Login.",
               error: error
          })
     }
}

const forgotPassword = async (req, res) => {
     try {
          console.log(req.body)
          const { email, newPassword } = req.body
          if (!email || !newPassword) {
               res.status(400).send({ message: "All fields are required."})
          }

          const user = await User.findOne({email})
          if (!user) {
               return res.status(404).send({
                    success: false,
                    message: "Email not registered."
               })
          }

          const hashed = await authHelper.hashPassword(newPassword)
          await User.findByIdAndUpdate(user._id, { password: hashed})
          res.status(200).send({
               success: true,
               message: "Password reset sucessfully."
          })

     } catch (error) {
          console.log(error)
          res.status(500).send({
               success: false,
               message: "Something went wrong.",
               error: error
          })
     }
}

const authController = {
     register,
     login,
     forgotPassword
}

export default authController