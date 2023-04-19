import React from 'react'
import './css/pagenotfound.css'
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const PageNotFound = () => {
     return (
          <Layout title="Page Not Found">
               <div className='d-flex align-items-center justify-content-center flex-column h-100'>
                    <h1 className='status-code'>404</h1>
                    <h1 className='not-found-text'>Oops ! Page Not Found</h1>
                    <Link to="/" className="btn btn-outline-dark rounded-0 mt-4 fw-bold">
                         Go Back
                    </Link>
               </div>
          </Layout>
     )
}

export default PageNotFound