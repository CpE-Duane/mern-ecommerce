
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import Unauthorized from '../components/Unauthorized';
import { useAuth } from '../context/auth';
import AuthService from '../services/AuthService';

export const AdminRoute = () => {
     const [ok, setOk] = useState(false)
     const [auth] = useAuth()

     useEffect(() => {
          const authAdminCheck = async () => {
               const { data } = await AuthService.authAdminCheck()
               if (data.ok) {
                    setOk(true)
               } else {
                    setOk(false)
               }
          }

          if (auth?.token) authAdminCheck()

     }, [auth?.token])

     return ok ? <Outlet /> : <Unauthorized path="/" />
}