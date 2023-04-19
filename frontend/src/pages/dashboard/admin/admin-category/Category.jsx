import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import categorySchema from './../../../../schema/category/categorySchema'
import CategoryService from './../../../../services/CategoryService'
import Toast from '../../../../toast/Toast'
import EditCategoryModal from './EditCategoryModal'
import Spinner from './../../../../components/Spinner';


const Category = () => {

     const [categories, setCategories] = useState([])
     const formRef = useRef()
     const [isEditModalOpen, setIsEditModalOpen] = useState(false)
     const [loading, setLoading] = useState(false)
     const [selectedCategory, setSelectedCategory] = useState('')

     const { register, handleSubmit, formState: { errors }, reset } = useForm({
          resolver: yupResolver(categorySchema),
          defaultValues: {
               name: ""
          }
     })

     const onSubmit = async (payload, e) => {
          e.preventDefault()

          try {
               setLoading(true)
               const { data } = await CategoryService.addCategory(payload)
               if (data.success) {
                    getCategories()
                    Toast.successMsg(`${data.category.name} added in categories.`)
                    reset()
               } else {
                    Toast.errorMsg(data.message)
               }
          } catch (error) {
               Toast.errorMsg(error.response.data.message)
          } finally {
               setLoading(false)
          }
     }

     const getCategories = async () => {
          try {
               setLoading(true)
               const { data } = await CategoryService.getCategories()
               if (data.success) {
                    setCategories(data.category)
               } else {
                    Toast.errorMsg(data.message)
               }

          } catch (error) {
               Toast.errorMsg(error.response.data?.message)
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
          getCategories()
     }, [])

     const deleteCategory = async (categoryId) => {
          try {
               setLoading(true)
               const { data } = await CategoryService.deleteCategory(categoryId)
               if (data.success) {
                    Toast.successMsg(data.message)
                    getCategories()
               }
          } catch (error) {
               console.log(error)
               Toast.errorMsg(error.response.data.message)
          } finally {
               setLoading(false)
          }
     }

     return (
          <>
               {
                    loading
                         ? <Spinner />
                         : (
                              <>
                                   <div className="container-fluid px-0">
                                        <div className="row">
                                             <div className="col">
                                                  <h3>Create Category</h3>
                                                  <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
                                                       <div className="row">
                                                            <div className="col-sm-4">
                                                                 <p className='mt-2 text-secondary fw-bold'>Category Name<span className="text-danger">*</span></p>
                                                            </div>
                                                            <div className="col-sm-8">
                                                                 <input type="text"
                                                                      id='name'
                                                                      placeholder='Enter category name'
                                                                      className='form-control text-secondary rounded-0'
                                                                      {...register("name")} />
                                                                 <span className="text-danger form-text">{errors.name?.message}</span>
                                                            </div>
                                                       </div>
                                                       <div className="row">
                                                            <div className="col-sm-4"></div>
                                                            <div className="col-sm-8">
                                                                 <button type='submit' className="btn btn-dark btn-hover rounded-0 mt-2">
                                                                      New Category
                                                                 </button>
                                                            </div>
                                                       </div>
                                                  </form>
                                             </div>
                                        </div>
                                   </div>

                                   {
                                        categories.length > 0
                                        && (
                                             <table className='table table-hover mt-5'>
                                                  <thead className='text-center'>
                                                       <tr>
                                                            <th>Category</th>
                                                            <th>Action</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody className='text-center'>
                                                       {
                                                            categories?.map((category) => {
                                                                 return (
                                                                      <tr key={category._id} className='align-middle'>
                                                                           <td>{category.name}</td>
                                                                           <td className='text-center'>
                                                                                <button className="btn btn-outline-success border-0 border-success border-bottom rounded-0" onClick={() => { setIsEditModalOpen(true); setSelectedCategory(category) }}>
                                                                                     <i className="fa fa-pen"></i>
                                                                                </button>
                                                                                <button className="btn btn-outline-danger border-0 border-danger border-bottom rounded-0 ms-5" onClick={() => deleteCategory(category._id)}>
                                                                                     <i className="fa fa-trash"></i>
                                                                                </button>
                                                                           </td>
                                                                      </tr>
                                                                 )
                                                            })
                                                       }
                                                  </tbody>
                                             </table>
                                        )
                                   }
                                   <EditCategoryModal isEditModalOpen={isEditModalOpen}
                                        setIsEditModalOpen={setIsEditModalOpen}
                                        selectedCategory={selectedCategory}
                                        getCategories={getCategories} />
                              </>
                         )
               }
          </>
     )
}

export default Category