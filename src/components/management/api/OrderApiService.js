import { apiClient } from "./ApiClient";

export const retrieveAllOrderApi = 
    () => apiClient.get('/orders')

export const orderProductApi =
    (productID, quantity) => apiClient.post(`/products/order/${productID}`, quantity)

export const retrieveOrderByIdApi =
    (orderID) => apiClient.get(`/orders/${orderID}`)

export const retrieveOrderProductByIdApi =
    (orderID) => apiClient.get(`/order_product/${orderID}`)

export const cartApi =
    () => apiClient.get('/cart')

export const checkOutApi =
    (orderFormDTO) => apiClient.post('/checkout', orderFormDTO)

export const orderSuccessApi = 
    (userID) => apiClient.get(`/success/${userID}`)

export const newestOrderByUserID = 
    (userID) => apiClient.get(`/order/${userID}`)