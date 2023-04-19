import React from 'react'
import Layout from '../../../components/layout/Layout';
import UserMenu from './UserMenu';
import { useAuth } from '../../../context/auth';

const UserDashboard = () => {

     const [auth] = useAuth()

     return (
          <Layout title="UserDashboard - Ecommerce App">
               <div className="container-fluid">
                    <div className="row">
                         <div className="col-sm-3 p-0">
                              <UserMenu />
                         </div>
                         <div className="col-sm-9 bg-warningl">
                              <div className="card">
                                   <div className="card-body">
                                        <h3>User name: {auth.user?.name}</h3>
                                        <h3>User email: {auth.user?.email}</h3>
                                        <h3>User contact: {auth.user?.phone}</h3>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </Layout>
     )
}

export default UserDashboard