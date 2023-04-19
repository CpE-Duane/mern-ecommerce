import Category from './../models/categoryModel.js';
import slugify from 'slugify'
import mongoose from 'mongoose';

const createCategory = async (req, res) => {
     try {
          const { name } = req.body
          if (!name) {
               return res.status(401).send({ message: "Category name is required" })
          }

          const existingCategory = await Category.findOne({ name })
          if (existingCategory) {
               return res.status(400).send({
                    success: true,
                    message: "Category Already Exists"
               })
          }

          const category = await Category.create({
               name,
               slug: slugify(name)
          })

          if (!category) {
               return res.status(404).send({
                    success: false,
                    message: "Category not added."
               })
          }

          res.status(201).send({
               success: true,
               message: "Category added successfully.",
               category: category
          })

     } catch (error) {
          console.log(error)
          res.status(500).send({
               success: false,
               error,
               message: "Error while adding category"
          })
     }
}

const updateCategory = async (req, res) => {
     try {
          const { name } = req.body
          const { id } = req.params
          const category = await Category.findByIdAndUpdate(id,
               {
                    name,
                    slug: slugify(name)
               },
               { new: true }
          )

          if (!category) {
               return res.status(404).send({
                    success: false,
                    message: "Category not found."
               })
          }

          res.status(200).send({
               success: true,
               message: "Category updated successfully.",
               category
          })

     } catch (error) {
          console.log(error)
          res.status(500).send({
               success: false,
               error,
               message: "Error while updating category."
          })
     }
}

const getAllCategory = async (req, res) => {
     try {
          const category = await Category.find({})
          if (!category) {
               return res.status(404).send({
                    success: false,
                    message: "Categories not found."
               })
          }

          res.status(200).send({
               success: true,
               message: "Categories fetch successfully.",
               category
          })

     } catch (error) {
          res.status(500).send({
               success: false,
               error,
               message: "Error while getting categories."
          })
     }
}

const getCategory = async (req, res) => {
     try {
          const { id } = req.params
          const category = await Category.findOne({ _id: new mongoose.Types.ObjectId(id) })
          if (!category) {
               return res.status(404).send({
                    success: false,
                    message: "Category not found."
               })
          }

          return res.status(200).send({
               success: true,
               message: "Category fetched successfully.",
               category
          })

     } catch (error) {
          console.error("Error: ", error);
          res.status(500).send({
               success: false,
               error,
               message: "Error while getting category."
          })
     }
}

const deleteCategory = async (req, res) => {
     try {
          const { id } = req.params
          const category = await Category.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(id) })
          if (!category) {
               req.status(400).send({
                    success: false,
                    message: "Category not found."
               })
          }

          res.status(200).send({
               success: true,
               message: "Category deleted successfully."
          })

     } catch (error) {
          res.status(500).send({
               success: false,
               error,
               message: "Error in deleting category."
          })
     }
}

const categoryController = {
     createCategory,
     updateCategory,
     getAllCategory,
     getCategory,
     deleteCategory
}

export default categoryController