import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import { ToastContainer } from 'react-toastify'
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import { UserRoute } from './routes/UserRoute';
import { AdminRoute } from './routes/AdminRoute';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import Users from './pages/dashboard/admin/Users';
import UserDashboard from './pages/dashboard/users/UserDashboard';
import Profile from './pages/dashboard/users/Profile';
import Orders from './pages/dashboard/users/Orders';
import AdminCategory from './pages/dashboard/admin/admin-category/AdminCategory'
import AdminProduct from './pages/dashboard/admin/admin-product/AdminProduct';

const App = () => {
  return (
    <div className='app'>
      <ToastContainer limit={2} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<UserRoute />} >
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />} >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App