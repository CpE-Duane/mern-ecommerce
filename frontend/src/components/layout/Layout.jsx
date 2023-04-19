import React from 'react'
import './css/layout.css'
import Footer from './Footer';
import Header from './Header';
import { Helmet } from 'react-helmet'

const Layout = ({ children, title, description, keywords, author }) => {
     return (
          <>
               <Helmet>
                    <meta charSet="utf-8" />
                    <title>{title}</title>
                    <meta name="description" content="Free Web tutorials" />
                    <meta name="keywords" content="HTML, CSS, JavaScript" />
                    <meta name="author" content="John Doe" />
               </Helmet>

               <Header />
               <div className='layout p-3'>
                    {children}
               </div>
               <Footer />


               
          </>
     )
}

export default Layout