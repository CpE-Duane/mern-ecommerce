import React, { useEffect, useState } from 'react'
import CategoryService from './../../../../services/CategoryService';
import Toast from '../../../../toast/Toast';
import { Select } from 'antd';
import ProductService from '../../../../services/ProductService';
import Spinner from './../../../../components/Spinner';

const Product = () => {

     const [categories, setCategories] = useState([])
     const [loading, setLoading] = useState(false)
     const [productPayload, setProductPayload] = useState(
          {
               name: '',
               description: '',
               price: 0,
               quantity: 0,
               category: '',
               photo: ''
          }
     )
     const [products, setProducts] = useState([])

     const handleChange = (e) => {
          const value = e.target.name === 'price' || e.target.name === 'quantity' ? parseFloat(e.target.value) : e.target.value;
          setProductPayload({
               ...productPayload,
               [e.target.name]: value,
          })
     }


     const handleSelectChange = (value) => {
          setProductPayload({
               ...productPayload,
               category: value
          })
     }


     const getCategories = async () => {
          try {
               setLoading(true)
               const { data } = await CategoryService.getCategories()
               if (data?.success) {
                    setCategories(data?.category)
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
          getProducts()
     }, [])

     const getProducts = async () => {
          try {
               setLoading(true)
               const { data } = await ProductService.getProducts()
               if (data.success) {
                    setProducts(data.products)
               } else {
                    Toast.errorMsg(data.message)
               }

          } catch (error) {
               Toast.errorMsg(error.response.data.message)
          } finally {
               setLoading(false)
          }
     }

     const onSubmit = async (e) => {
          e.preventDefault()

          try {
               console.log(productPayload)
               // setLoading(true)
               // const { data } = await ProductService.createProduct(productPayload)
               // if (data.success) {
               //      Toast.successMsg(data.message)
               //      getProducts()
               // } else {
               //      Toast.errorMsg(data.message)
               // }
          } catch (error) {
               Toast.errorMsg(error.response.data.message)
          } finally {
               setLoading(false)
          }
     }

     const handleImage = (e) => {
          try {
               const file = e.target.files[0];
               const reader = new FileReader();

               reader.onloadend = () => {
                    setProductPayload({
                         ...productPayload,
                         photo: reader.result
                    })
               }

               if (file) {
                    reader.readAsDataURL(file);
               } else {
                    setProductPayload({
                         ...productPayload,
                         photo: ''
                    })
               }
          } catch (error) {

          }
     }


     return (
          <>
               {
                    loading
                         ? <Spinner />
                         : (
                              <>
                                   <h3>Create Product</h3>
                                   <form >
                                        <div className="row">
                                             <div className="col-4">

                                                  <div className='mb-3'>
                                                       <span className='text-secondary fw-bold'>Product Name<span className="text-danger">*</span></span>
                                                       <input type="text"
                                                            name='name'
                                                            placeholder='Enter product name'
                                                            className='form-control mt-2'
                                                            onChange={handleChange} />
                                                  </div>
                                                  <div className='mb-3'>
                                                       <span className='text-secondary fw-bold'>Description<span className="text-danger">*</span></span>
                                                       <input type="text"
                                                            name='description'
                                                            placeholder='Enter product description'
                                                            className='form-control mt-2'
                                                            onChange={handleChange} />
                                                  </div>
                                                  <div className='mb-3'>
                                                       <span className='text-secondary fw-bold'>Price<span className="text-danger">*</span></span>
                                                       <input type="number"
                                                            name='price'
                                                            placeholder='Enter product price'
                                                            className='form-control mt-2'
                                                            onChange={handleChange} />
                                                  </div>
                                             </div>

                                             <div className="col-4">
                                                  <div className='mb-3'>
                                                       <span className='text-secondary fw-bold'>Category<span className="text-danger">*</span></span>
                                                       <Select
                                                            showSearch
                                                            placeholder="Select category"
                                                            optionFilterProp="children"
                                                            size='large'
                                                            onChange={handleSelectChange}
                                                            className='w-100 mt-2'
                                                            filterOption={(input, option) =>
                                                                 (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                            }
                                                            options={
                                                                 categories.map((category) => {
                                                                      return (
                                                                           {
                                                                                value: category._id,
                                                                                label: category.name,
                                                                           }
                                                                      )
                                                                 })
                                                            }
                                                       />
                                                  </div>
                                                  <div className='mb-3'>
                                                       <span className='text-secondary fw-bold'>Quantity<span className="text-danger">*</span></span>
                                                       <input type="number"
                                                            placeholder='Enter product quantity'
                                                            className='form-control mt-2'
                                                            onChange={handleChange}
                                                            name='quantity' />
                                                  </div>
                                                  <div>
                                                       <span className='text-secondary fw-bold'>Photo<span className="text-danger">*</span></span>
                                                       <input type="file"
                                                            name='photo'
                                                            accept='image/*'
                                                            className='form-control mt-2'
                                                            onChange={handleImage}
                                                       />
                                                  </div>
                                             </div>
                                             <div className="col-4">
                                                  <img src={productPayload.photo} className='img-fluid' alt="" />
                                             </div>
                                        </div>
                                        <div className="row">
                                             <div className="col">
                                                  <button onClick={onSubmit}
                                                       className="btn btn-dark rounded-0 border-0 btn-hover">
                                                       New Product
                                                  </button>
                                             </div>
                                        </div>
                                   </form>

                                   <div className="row mt-5">
                                        <div className="col">
                                             <table className='table table-hover'>
                                                  <thead>
                                                       <tr className='text-center'>
                                                            <th>Product Name</th>
                                                            <th>Category</th>
                                                            <th>Description</th>
                                                            <th>Price</th>
                                                            <th>Quantity</th>
                                                            <th>Action</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {
                                                            products?.map((product) => {
                                                                 return (
                                                                      <tr key={product._id} className='text-center align-middle'>
                                                                           <td>{product.name}</td>
                                                                           <td>{product.category}</td>
                                                                           <td>{product.description}</td>
                                                                           <td>{product.price}</td>
                                                                           <td>{product.quantity}</td>
                                                                           <td>
                                                                                <button className="btn btn-outline-success border-0 border-success border-bottom rounded-0" >
                                                                                     <i className="fa fa-pen"></i>
                                                                                </button>
                                                                                <button className="btn btn-outline-danger border-0 border-danger border-bottom rounded-0 ms-5">
                                                                                     <i className="fa fa-trash"></i>
                                                                                </button>
                                                                           </td>
                                                                      </tr>
                                                                 )
                                                            })
                                                       }
                                                  </tbody>
                                             </table>
                                        </div>
                                   </div>
                              </>
                         )
               }
          </>
     )
}

export default Product