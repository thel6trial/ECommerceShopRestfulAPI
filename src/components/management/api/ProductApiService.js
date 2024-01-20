import { apiClient } from "./ApiClient";

export const retrieveAllProductsApi
     = () => apiClient.get('/products')

export const retrieveProductByIdApi
    = (id) => apiClient.get(`/products/${id}`)

export const deleteProductApi
     = (id) => apiClient.delete(`/products/${id}`)

export const updateProductApi
     = (id, productFormDTO) => apiClient.put(`/products/${id}`, productFormDTO)

export const createProductApi
     = (productFormDTO) => apiClient.post(`/products`, productFormDTO)

export const hintProductApi 
     = () => apiClient.get('/products/hint')