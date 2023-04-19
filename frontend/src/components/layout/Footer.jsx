import React from 'react'
import {NavLink} from 'react-router-dom'
import './css/footer.css'

const Footer = () => {
     return (
          <div className='footer container-fluid d-flex align-items-center justify-content-center flex-column'>
               <h4>All Right Reserved &copy; DSV</h4>
               <p className="m-0">
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/policy">Privacy Policy</NavLink>
               </p>
          </div>
     )
}

export default Footer