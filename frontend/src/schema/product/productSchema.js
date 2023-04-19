import * as yup from 'yup'

const productSchema = yup.object().shape({
    name: yup.string().required("Name is required."),
    description: yup.string().required("Description is required."),
    category: yup.string().required("Category is required."),
    price: yup.number().typeError("Price is required.").required("Price is required."),
    quantity: yup.number().typeError("Quantity is required.").required("Quantity is required."),
    shipping: yup.string().required("Shipping is required."),
})

export default productSchema