import axios, { AxiosError, AxiosHeaders, type AxiosInstance } from 'axios'
import { API_CONFIG } from '../../constants/api'
import { authService } from '../auth/authService'

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
})

axiosClient.interceptors.request.use(async (config) => {
  const token = await authService.getToken()
  const requestConfig = config

  if (token) {
    const headers = AxiosHeaders.from(requestConfig.headers)
    headers.set('Authorization', `Bearer ${token}`)
    requestConfig.headers = headers
  }

  return requestConfig
})

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status
    if (status && status >= 500) {
      return Promise.reject(new Error('Server unavailable. Please retry.'))
    }

    return Promise.reject(error)
  },
)

export default axiosClient
