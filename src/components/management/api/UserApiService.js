import { apiClient } from "./ApiClient";

export const retriveAllUsersApi =
    () => apiClient.get('users')

export const retrieveUserByIdApi = 
    (id) => apiClient.get(`/users/${id}`)

export const deleteUserApi = 
    (id) => apiClient.delete(`/users/${id}`)

export const updateUserApi =
    (id, userFormDTO) => apiClient.put(`/users/${id}`, userFormDTO)

export const createUserApi = 
    (userFormDTO) => apiClient.post(`/users`, userFormDTO)

export const retrieveUserBy0Api =
    () => apiClient.get('/info')
    
export const registerUserApi = 
    (registerFormDTO) => apiClient.post(`/register`, registerFormDTO)