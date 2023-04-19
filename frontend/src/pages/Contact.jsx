import React from 'react'
import './css/contact.css'
import contactus from '../assets/images/contactus.jpeg'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'
import { BiPhoneCall } from 'react-icons/bi'
import { BsHeadset } from 'react-icons/bs'
import Layout from '../components/layout/Layout'

const Contact = () => {
     return (
          <Layout title="Contact Us - Ecommerce App">
               <div className="container-fluid h-100">
                    <div className="row h-100">
                         <div className="col-sm-8 px-0 d-flex align-items-center justify-content-center">
                              <img src={contactus} alt="" className='h-100 w-100' />
                         </div>
                         <div className="col-sm-4">
                              <h1 className="w-100 border-5 border-bottom text-secondary border-secondary text-center py-2">
                                   CONTACT US
                              </h1>
                              <h5 className='text-center text-secondary my-3'>
                                   Any query and info about the products, feel free to contact us anytime. We are available 24x7.
                              </h5>
                              <h5 className='text-secondary'><MdOutlineMarkEmailUnread /> : www.help@ecommerceapp.com</h5>
                              <h5 className='text-secondary'><BiPhoneCall /> : 012-3456789</h5>
                              <h5 className='text-secondary'><BsHeadset /> : 1800-0000-0000 (toll free)</h5>
                         </div>
                    </div>
               </div>
          </Layout>
     )
}

export default Contact