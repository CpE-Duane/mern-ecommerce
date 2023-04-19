import React from 'react'
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
     return (
          <>
               <div className='text-center'>
                    <div className="list-group">
                         <h4>Dashboard</h4>
                         <NavLink to="/dashboard/admin/category"
                              className="list-group-item list-group-item-action">
                              Category
                         </NavLink>
                         <NavLink to="/dashboard/admin/product"
                              className="list-group-item list-group-item-action">
                              Product
                         </NavLink>
                         <NavLink to="/dashboard/admin/users"
                              className="list-group-item list-group-item-action">
                              Users
                         </NavLink>
                    </div>
               </div>
          </>
     )
}

export default AdminMenu