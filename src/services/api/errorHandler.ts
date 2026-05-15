import type { AxiosError } from 'axios'

export const mapApiError = (error: unknown): string => {
  const axiosError = error as AxiosError<{ message?: string }>
  return axiosError.response?.data?.message ?? axiosError.message ?? 'Unexpected API error'
}
