import React, { useState, useEffect } from 'react'
import '../css/login.css'
import Layout from '../../components/layout/Layout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Toast from '../../toast/Toast';
import { useAuth } from '../../context/auth'
import Spinner from './../../components/Spinner';
import loginSchema from './../../schema/authSchema/loginSchema';
import AuthService from '../../services/AuthService'

const Login = () => {

     const navigate = useNavigate()
     const location = useLocation()
     const [auth, setAuth] = useAuth()

     const [showPassword, setShowPassword] = useState(false)
     const [loading, setLoading] = useState(false)

     useEffect(() => {
          if (auth.token !== "" && auth.user !== null) {
               navigate("/")
          }
          // eslint-disable-next-line
     }, [auth])

     const { register, handleSubmit, formState: { errors } } = useForm({
          resolver: yupResolver(loginSchema)
     })

     const onSubmit = async (payload, e) => {
          e.preventDefault()
          try {
               setLoading(true)
               const { data } = await AuthService.loginUser(payload)
               Toast.successMsg(data.message)
               setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token
               })
               localStorage.setItem("auth", JSON.stringify(data))
               setLoading(false)
               navigate(location.state || "/")
          } catch (error) {
               setLoading(false)
               Toast.errorMsg(error.response?.data.message)
          }
     }

     return (
          <>
               {
                    loading
                         ? <Spinner />
                         : (
                              <Layout title="Login - Ecommerce App">
                                   <div className="login container-fluid h-100">
                                        <div className="row h-100 d-flex justify-content-center align-items-centerd-flex justify-content-center align-items-center">
                                             <div className="col-sm-3">
                                                  <div className="card px-4 border-0 shadow">
                                                       <div className="card-body">
                                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                                 <h2 className='text-center text-secondary mb-3'>LOGIN FORM</h2>
                                                                 <div className='mb-1'>
                                                                      <label htmlFor="email" className='text-secondary'>Email address</label>
                                                                      <input type="email"
                                                                           id='email'
                                                                           placeholder='Ex: vduane@gmail.com'
                                                                           className='form-control text-secondary border-0 rounded-0'
                                                                           {...register('email')} />
                                                                      <span className="text-danger form-text">{errors.email?.message}</span>
                                                                 </div>
                                                                 <div className='mb-4'>
                                                                      <label htmlFor="password" className='text-secondary'>Password</label>
                                                                      <div className='d-flex align-items-center position-relative'>
                                                                           <input type={`${showPassword ? "text" : "password"}`}
                                                                                id='password'
                                                                                placeholder='***********'
                                                                                className='form-control border-0 text-secondary rounded-0'
                                                                                {...register('password')} />
                                                                           <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} eye position-absolute me-3`}
                                                                                onClick={() => setShowPassword(!showPassword)}>
                                                                           </i>
                                                                      </div>
                                                                      <span className="text-danger form-text">{errors.password?.message}</span>
                                                                 </div>
                                                                 <div className='text-center d-flex flex-column'>
                                                                      <button className='btn btn-dark rounded-0 fw-bold mb-1'
                                                                           type='submit'
                                                                           disabled={loading}>
                                                                           LOGIN
                                                                      </button>
                                                                      <p><Link className='text-dark fw-bold' to="/forgot-password">Forgot password?</Link></p>
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

export default Login