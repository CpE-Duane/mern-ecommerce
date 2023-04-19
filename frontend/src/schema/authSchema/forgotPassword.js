import * as yup from 'yup'

const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email("Invalid email.").required("Email is required."),
    newPassword: yup.string().required("Password is required.")
        .min(6, "Password must be at least 6 characters.")
        .max(20),
    confirmPassword: yup.string().required("Confirm Password is required.")
        .oneOf([yup.ref("newPassword"), null], "Password don't match.")
})

export default forgotPasswordSchema