import React from 'react'
import Layout from '../../../../components/layout/Layout'
import AdminMenu from '../AdminMenu'
import Product from './Product'


const AdminProduct = () => {
     return (
          <Layout title="Dashboard - Product">
               <div className="row">
                    <div className="col-sm-3">
                         <AdminMenu />
                    </div>
                    <div className="col-sm-9">
                         <div className="col">
                              <Product />
                         </div>
                    </div>
               </div>
          </Layout>
     )
}

export default AdminProduct