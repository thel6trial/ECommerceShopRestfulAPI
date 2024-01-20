import { apiClient } from "./ApiClient";


export const retrieveAllPromotionApi =
    () => apiClient.get('/promotions')

export const retrievePromotionByIDApi =
    (promotionID) => apiClient.get(`/promotions/${promotionID}`)

export const createPromotionApi =
    (promotionFormDTO) => apiClient.post('/promotions', promotionFormDTO)

export const updatePromotionApi =
    (promotionID, promotionFormDTO) => apiClient.put(`/promotions/${promotionID}`, promotionFormDTO)

export const activatePromotionApi =
    (promotionID) => apiClient.post(`/promotions/activate/${promotionID}`)

export const deactivatePromotionApi =
    (promotionID) => apiClient.post(`/promotions/deactivate/${promotionID}`)

export const retrievePromotionByLoyaltyIdApi =
    (loyaltyID) => apiClient.get(`/loyalty/${loyaltyID}`)

export const retrievePromotionByCodeApi =
    (promotionCodeRequestDTO) => apiClient.post('/promotions/code', promotionCodeRequestDTO)

export const retrieveUserPromotionByUserIdApi =
    (userID) => apiClient.get(`/user/promotion/${userID}`)
