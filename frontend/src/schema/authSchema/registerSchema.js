import * as yup from 'yup'

const registerSchema = yup.object().shape({
    name: yup.string().required("Name is required."),
    email: yup.string().required("Email is required.").email("Invalid email."),
    password: yup.string().required("Password is required.")
        .min(6, "Password must be atleast 6 characters.")
        .max(20),
    confirmPassword: yup.string()
        .required("Confirm Password is required.")
        .oneOf([yup.ref("password"), null], "Password don't match."),
    address: yup.string().required("Address is required."),
    phone: yup.string().required("Phone is required."),
})

export default registerSchema