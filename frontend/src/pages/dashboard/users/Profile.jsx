import React from 'react'
import Layout from '../../../components/layout/Layout'
import UserMenu from './UserMenu'

const Profile = () => {
     return (
          <Layout title="Profile - Ecommerce App">
               <div className="container-fluid">
                    <div className="row">
                         <div className="col-sm-3">
                              <UserMenu />
                         </div>
                         <div className="col-sm-9">
                              <h1>Profile</h1>
                         </div>
                    </div>
               </div>
          </Layout>
     )
}

export default Profile