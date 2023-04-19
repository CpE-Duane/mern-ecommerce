
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth'
import { Outlet } from 'react-router-dom'
import Unauthorized from '../components/Unauthorized';
import AuthService from '../services/AuthService';

export const UserRoute = () => {
     const [ok, setOk] = useState(false)
     const [auth] = useAuth()

     useEffect(() => {
          const authCheck = async () => {
               const { data } = await AuthService.authCheck()
               if (data.ok) {
                    setOk(true)
               } else {
                    setOk(false)
               }
          }

          if (auth?.token) authCheck()

     }, [auth?.token])

     return ok ? <Outlet /> : <Unauthorized />
}