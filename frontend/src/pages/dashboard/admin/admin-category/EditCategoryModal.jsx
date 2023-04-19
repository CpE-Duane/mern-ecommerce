import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import categorySchema from '../../../../schema/category/categorySchema'
import CategoryService from '../../../../services/CategoryService'
import Toast from './../../../../toast/Toast';
import Spinner from '../../../../components/Spinner'

const EditCategoryModal = ({ isEditModalOpen, setIsEditModalOpen, selectedCategory, getCategories }) => {

     const [categoryName, setCategoryName] = useState('')
     const [loading, setLoading] = useState(false)

     const { register, handleSubmit, formState: { errors }, reset } = useForm({
          resolver: yupResolver(categorySchema)
     })

     useEffect(() => {
          if (selectedCategory) {
               setCategoryName(selectedCategory.name)
               reset({ name: selectedCategory.name })
          }
     }, [selectedCategory])


     const handleClose = () => {
          setIsEditModalOpen(false)
     }

     const onSubmit = async (payload, e) => {
          e.preventDefault()

          try {
               setLoading(true)
               setIsEditModalOpen(false)
               const { data } = await CategoryService.updateCategory(selectedCategory._id, payload)
               if (data.success) {
                    Toast.successMsg(data.message)
                    getCategories()
               }
          } catch (error) {
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
                              <Modal show={isEditModalOpen} onHide={handleClose}>
                                   <Modal.Header closeButton>
                                        <Modal.Title>{`Update "${categoryName}" category`}</Modal.Title>
                                   </Modal.Header>
                                   <Modal.Body>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                             <span className='text-secondary fw-bold'>Category Name<span className="text-danger">*</span></span>
                                             <input type="text"
                                                  placeholder='Enter category name'
                                                  className='form-control mt-2'
                                                  {...register("name")} />
                                             <span className="text-danger form-text">{errors.name?.message}</span>

                                             <div className='float-end mt-3'>
                                                  <button type='button' className="btn btn-secondary rounded-0" onClick={handleClose}>
                                                       Cancel
                                                  </button>
                                                  <button type='submit'
                                                       className='btn btn-dark btn-hover rounded-0 ms-3'>
                                                       Update
                                                  </button>
                                             </div>
                                        </form>
                                   </Modal.Body>
                              </Modal>
                         )
               }
          </>
     )
}

export default EditCategoryModal