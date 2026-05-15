import axiosClient from './axiosClient'
import { mapApiError } from './errorHandler'

const MAX_RETRIES = 2

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export const getWithRetry = async <T>(url: string, signal?: AbortSignal): Promise<T> => {
  let attempt = 0

  while (attempt <= MAX_RETRIES) {
    try {
      const response = await axiosClient.get<T>(url, { signal })
      return response.data
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        throw new Error(mapApiError(error), { cause: error })
      }
      attempt += 1
      await wait(200 * attempt)
    }
  }

  throw new Error('Request failed')
}
