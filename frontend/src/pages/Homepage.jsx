import React from 'react'
import './css/homepage.css'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'

const Homepage = () => {

     const [auth] = useAuth()

     return (
          <Layout title="Ecommerce App - Show Now">
               Homepage
               <pre>
                    {JSON.stringify(auth, null, 4)}
               </pre>
          </Layout>
     )
}

export default Homepage