import React from 'react'
import Layout from '../../../components/layout/Layout'
import AdminMenu from './AdminMenu'

const Users = () => {
     return (
          <Layout title="Dashboard - All Users">
               <div className="row">
                    <div className="col-sm-3">
                         <AdminMenu />
                    </div>
                    <div className="col-sm-9">
                         Users
                    </div>
               </div>
          </Layout>
     )
}

export default Users