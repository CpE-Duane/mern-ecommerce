import React from 'react'
import Layout from '../../../components/layout/Layout'
import AdminMenu from './AdminMenu'
import { useAuth } from '../../../context/auth'


const AdminDashboard = () => {

     const [auth] = useAuth()

     return (
          <Layout>
               <div className="container-fluid h-100">
                    <div className="row h-100">
                         <div className="col-sm-3 p-0">
                              <AdminMenu />
                         </div>
                         <div className="col-sm-9">
                              <div className="card">
                                   <div className="card-body">
                                        <h3>Admin name: {auth.user?.name}</h3>
                                        <h3>Admin email: {auth.user?.email}</h3>
                                        <h3>Admin contact: {auth.user?.phone}</h3>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </Layout>
     )
}

export default AdminDashboard