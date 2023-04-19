import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../toast/Toast';
import Spinner from './../../components/Spinner';
import '../css/forgotPassword.css'
import { useAuth } from '../../context/auth';
import forgotPasswordSchema from './../../schema/authSchema/forgotPassword';
import AuthService from '../../services/AuthService'

const ForgotPassword = () => {

     const navigate = useNavigate()
     const location = useLocation()
     const [showNewPassword, setShowNewPassword] = useState(false)
     const [showConfirmPassword, setShowConfirmPassword] = useState(false)
     const [loading, setLoading] = useState(false)
     const [auth] = useAuth()

     const { register, handleSubmit, formState: { errors } } = useForm({
          resolver: yupResolver(forgotPasswordSchema)
     })

     useEffect(() => {
          if (auth.token !== "" && auth.user !== null) {
               navigate("/")
          }

          // eslint-disable-next-line
     }, [auth])

     const onSubmit = async (formData, e) => {
          e.preventDefault()

          const payload = {
               email: formData.email,
               newPassword: formData.newPassword
          }

          try {
               setLoading(true)
               const { data } = await AuthService.forgotPassword(payload)
               Toast.successMsg(data.message)
               setLoading(false)
               navigate(location.state || "/login")
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
                              <Layout title="Forgot Password - Ecommerce App">
                                   <div className="forgot-password container-fluid h-100">
                                        <div className="row h-100 d-flex justify-content-center align-items-centerd-flex justify-content-center align-items-center">
                                             <div className="col-sm-3">
                                                  <div className="card px-4 border-0 shadow">
                                                       <div className="card-body">
                                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                                 <h2 className='text-center text-secondary'>RESET PASSWORD</h2>
                                                                 <div className='mb-1'>
                                                                      <label htmlFor="email" className='text-secondary'>Email address</label>
                                                                      <input type="email"
                                                                           id='email'
                                                                           autoComplete='off'
                                                                           placeholder='Ex: vduane@gmail.com'
                                                                           className='form-control text-secondary border-0 rounded-0'
                                                                           {...register('email')} />
                                                                      <span className="text-danger form-text">{errors.email?.message}</span>
                                                                 </div>
                                                                 <div className='mb-3'>
                                                                      <label htmlFor="newPassword" className='text-secondary'>New password</label>
                                                                      <div className='d-flex align-items-center position-relative'>
                                                                           <input type={`${showNewPassword ? "text" : "password"}`}
                                                                                id='newPassword'
                                                                                autoComplete='new-password'
                                                                                placeholder='***********'
                                                                                className='form-control text-secondary border-0 rounded-0'
                                                                                {...register('newPassword')} />
                                                                           <i className={`fa ${showNewPassword ? "fa-eye-slash" : "fa-eye"} eye position-absolute me-3`}
                                                                                onClick={() => setShowNewPassword(!showNewPassword)}>
                                                                           </i>
                                                                      </div>
                                                                      <span className="text-danger form-text">{errors.newPassword?.message}</span>
                                                                 </div>
                                                                 <div className='mb-3'>
                                                                      <label htmlFor="confirmPassword" className='text-secondary'>Confirm password</label>
                                                                      <div className='d-flex align-items-center position-relative'>
                                                                           <input type={`${showConfirmPassword ? "text" : "password"}`}
                                                                                id='confirmPassword'
                                                                                placeholder='***********'
                                                                                autoComplete='off'
                                                                                className='form-control text-secondary border-0 rounded-0'
                                                                                {...register('confirmPassword')} />
                                                                           <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} eye position-absolute me-3`}
                                                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                                           </i>
                                                                      </div>
                                                                      <span className="text-danger form-text">
                                                                           {errors.confirmPassword?.message}
                                                                      </span>
                                                                 </div>
                                                                 <div className='text-center d-flex flex-column'>
                                                                      <button className='btn btn-dark rounded-0 fw-bold mb-1 mt-3'
                                                                           type='submit'
                                                                           disabled={loading}
                                                                      >
                                                                           RESET
                                                                      </button>

                                                                      <Link className='text-dark fw-bold' to="/login">Login</Link>

                                                                      <span className='text-secondary'>Don't have an account?
                                                                           <Link to="/register" className='text-dark fw-bold'> Register</Link>
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

export default ForgotPassword