import React, { useEffect, useState } from 'react'
import '../css/register.css'
import Layout from '../../components/layout/Layout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../toast/Toast';
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { useAuth } from '../../context/auth'
import registerSchema from './../../schema/authSchema/registerSchema';
import AuthService from '../../services/AuthService'

const Register = () => {

     const navigate = useNavigate()

     const [showPassword, setShowPassword] = useState(false)
     const [showConfirmPassword, setShowConfirmPassword] = useState(false)
     const [loading, setLoading] = useState(false)
     const [auth] = useAuth()

     const { register, handleSubmit, formState: { errors } } = useForm({
          resolver: yupResolver(registerSchema)
     })


     useEffect(() => {
          if (auth.token !== "" && auth.user !== null) {
               navigate("/")
          }

          // eslint-disable-next-line
     }, [auth])

     const onSubmit = async (data, e) => {
          e.preventDefault()
          const payload = {
               name: data.name,
               email: data.email,
               password: data.password,
               phone: data.phone,
               address: data.address
          }

          try {
               setLoading(true)
               const { data } = await AuthService.registerUser(payload)
               if (!data.success) {
                    Toast.warningMsg(data.message)
                    setLoading(false)
                    return
               }
               Toast.successMsg(data.message)
               setLoading(false)
               navigate("/login")
          } catch (error) {
               Toast.errorMsg(error.response.data.message)
               setLoading(false)
          }
     }

     return (
          <>
               {
                    loading
                         ? <Spinner />
                         : (
                              <Layout title="Register - Ecommerce App">
                                   <div className="register container-fluid h-100">
                                        <div className="row h-100 d-flex justify-content-center align-items-center">
                                             <div className="col-sm-3">
                                                  <div className="card px-4 border-0 rounded-0 shadow">
                                                       <div className="card-body">
                                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                                 <h2 className='text-center text-secondary'>REGISTRATION FORM</h2>
                                                                 <div className='mb-1'>
                                                                      <label htmlFor="name" className='text-secondary'>Name</label>
                                                                      <input type="text"
                                                                           id="name"
                                                                           autoComplete="off"
                                                                           placeholder='Ex: Duane Villapando'
                                                                           className='form-control text-secondary border-0 rounded-0'
                                                                           {...register('name')} />
                                                                      <span className="text-danger form-text">{errors.name?.message}</span>
                                                                 </div>
                                                                 <div className='mb-1'>
                                                                      <label htmlFor="email" className='text-secondary'>Email address</label>
                                                                      <input type="email"
                                                                           id='email'
                                                                           autoComplete="off"
                                                                           placeholder='Ex: vduane@gmail.com'
                                                                           className='form-control text-secondary border-0 rounded-0'
                                                                           {...register('email')} />
                                                                      <span className="text-danger form-text">{errors.email?.message}</span>
                                                                 </div>
                                                                 <div className='mb-1'>
                                                                      <label htmlFor="password" className='text-secondary'>Password</label>
                                                                      <div className='d-flex align-items-center position-relative'>
                                                                           <input type={`${showPassword ? "text" : "password"}`}
                                                                                id='password'
                                                                                autoComplete="new-password"
                                                                                placeholder='***********'
                                                                                className='form-control text-secondary border-0 rounded-0 pe-5'
                                                                                {...register('password')} />
                                                                           <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} eye position-absolute me-3`}
                                                                                onClick={() => setShowPassword(!showPassword)}>
                                                                           </i>
                                                                      </div>
                                                                      <span className="text-danger form-text">{errors.password?.message}</span>
                                                                 </div>
                                                                 <div className='mb-1'>
                                                                      <label htmlFor="confirm-password" className='text-secondary'>Confirm Password</label>
                                                                      <div className='d-flex align-items-center position-relative'>
                                                                           <input type={`${showConfirmPassword ? "text" : "password"}`}
                                                                                id='confirm-password'
                                                                                autoComplete="new-password"
                                                                                placeholder='***********'
                                                                                className='form-control text-secondary border-0 rounded-0 pe-5'
                                                                                {...register('confirmPassword')} />
                                                                           <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} eye position-absolute me-3`}
                                                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                                           </i>
                                                                      </div>
                                                                      <span className="text-danger form-text">{errors.confirmPassword?.message}</span>
                                                                 </div>
                                                                 <div className='mb-1'>
                                                                      <label htmlFor="phone" className='text-secondary'>Phone</label>
                                                                      <input type="text"
                                                                           id='phone'
                                                                           autoComplete="off"
                                                                           placeholder='Ex: +123456789'
                                                                           className='form-control text-secondary border-0 rounded-0'
                                                                           {...register('phone')} />
                                                                      <span className="text-danger form-text">{errors.phone?.message}</span>
                                                                 </div>
                                                                 <div className='mb-2'>
                                                                      <label htmlFor="address" className='text-secondary'>Address</label>
                                                                      <input type="text"
                                                                           id='address'
                                                                           autoComplete="off"
                                                                           placeholder='Ex: Duane Villapando'
                                                                           className='form-control text-secondary border-0 rounded-0'
                                                                           {...register('address')} />
                                                                      <span className="text-danger form-text">{errors.address?.message}</span>
                                                                 </div>
                                                                 <div className='text-center d-flex flex-column'>
                                                                      <button className='btn btn-dark rounded-0 fw-bold mb-2'
                                                                           type='submit'
                                                                           disabled={loading}
                                                                      >
                                                                           REGISTER
                                                                      </button>
                                                                      <span className='text-secondary'>Already have an account?
                                                                           <Link to="/login" className='text-dark fw-bold'> Login</Link>
                                                                      </span>
                                                                 </div>
                                                            </form>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </Layout>
                         )
               }
          </>
     )
}

export default Register