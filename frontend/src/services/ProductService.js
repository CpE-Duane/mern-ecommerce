import axios from 'axios'

const serverUrl = "http://localhost:8080"

const createProduct = (payload) => {
     return axios.post(`${serverUrl}/api/v1/product/create-product`, payload, {
          headers: {
               "Content-Type": "application/json"
          }
     })
}

const getProducts = () => {
     return axios.get(`${serverUrl}/api/v1/product/get-products`)
}


const ProductService = {
     createProduct,
     getProducts
}

export default ProductService