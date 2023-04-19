import axios from 'axios'

const serverUrl = "http://localhost:8080"

const registerUser = (payload) => {
     return axios.post(`${serverUrl}/api/v1/auth/register`, payload, {
          headers: {
               "Content-Type": "application/json"
          }
     })
}

const loginUser = (payload) => {
     return axios.post(`${serverUrl}/api/v1/auth/login`, payload, {
          headers: {
               "Content-Type": "application/json"
          }
     })
}

const authCheck = () => {
     return axios.get(`${serverUrl}/api/v1/auth/user-auth`)
}

const authAdminCheck = () => {
     return axios.get(`${serverUrl}/api/v1/auth/admin-auth`)
}

const forgotPassword = (payload) => {
     return axios.post(`${serverUrl}/api/v1/auth/forgot-password`, payload, {
          headers: {
               "Content-Type": "application/json"
          }
     })
}

const AuthService = {
     registerUser,
     loginUser,
     authCheck,
     authAdminCheck,
     forgotPassword
}

export default AuthService