import axios from 'axios'

const serverUrl = "http://localhost:8080"

const getCategories = () => {
     return axios.get(`${serverUrl}/api/v1/category/get-categories`)
}

const addCategory = (payload) => {
     return axios.post(`${serverUrl}/api/v1/category/create-category`, payload , {
          headers: {
               "Content-Type": "application/json"
          }
     })
}

const deleteCategory = (categoryId) => {
     return axios.delete(`${serverUrl}/api/v1/category/delete-category/${categoryId}`)
}

const updateCategory = (categoryId, payload) => {
     return axios.put(`${serverUrl}/api/v1/category/update-category/${categoryId}`, payload, {
          headers: {
               "Content-Type": "application/json"
          }
     })
}


const CategoryService = {
     getCategories,
     addCategory,
     deleteCategory,
     updateCategory
}

export default CategoryService