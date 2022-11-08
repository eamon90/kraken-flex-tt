import axios from 'axios'
import axiosRetry from 'axios-retry'
import { errorLogger } from './loggers'

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 2000
  },
  retryCondition: (error) => error?.response?.status === 500,
})
// I found this axios plugin and I believe I've succesfully configured it to retry up to three times every two seconds after any 500 responses. I've been unable to determine how to test this, which I would certainly do given more time to dedicate to it.

export const getData = async (url: string, headers: any) => {
  try {
    const response = await axios.get(url, { headers })
    return response.data
  } catch (error) {
    errorLogger(`Failed to GET data from ${url}`, error)
    throw error
  }
}

export const postData = async (url: string, data: any, headers: any) => {
  try {
    const result = await axios.post(url, data, { headers })
  } catch (error) {
    errorLogger(`Failed to POST data to ${url}`, error)
    throw error
  }
}
