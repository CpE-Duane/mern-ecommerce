import * as yup from 'yup'

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email.").required("Email is required."),
    password: yup.string().required("Password is required.").min(6).max(20),
})

export default loginSchema