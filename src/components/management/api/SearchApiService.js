import { apiClient } from "./ApiClient";


export const searchProductNameApi = 
      (productName) => apiClient.post('/products/search/name', productName)

export const searchCategoryNameApi 
    = (categoryName) => apiClient.post('/products/search/category', categoryName)