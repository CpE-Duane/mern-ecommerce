import React from 'react'
import Layout from '../../../components/layout/Layout'
import UserMenu from './UserMenu';

const Orders = () => {
     return (
          <Layout title="Orders - Ecommerce App">
               <div className="container-fluid">
                    <div className="row">
                         <div className="col-sm-3">
                              <UserMenu />
                         </div>
                         <div className="col-sm-9">
                              <h1>All Orders</h1>
                         </div>
                    </div>
               </div>
          </Layout>
     )
}

export default Orders