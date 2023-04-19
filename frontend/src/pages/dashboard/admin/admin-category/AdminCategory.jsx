import React from 'react'
import Layout from '../../../../components/layout/Layout';
import AdminMenu from '../AdminMenu';
import Category from './Category';



const AdminCategory = () => {

     return (
          <Layout title="Dashboard - Category">
               <div className="row">
                    <div className="col-sm-3">
                         <AdminMenu />
                    </div>
                    <div className="col-sm-9">
                         <div className="col-sm-9">
                              <Category />
                         </div>
                    </div>
               </div>
          </Layout>
     )
}

export default AdminCategory