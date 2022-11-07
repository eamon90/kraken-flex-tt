import axios from 'axios'
import { errorLogger } from './logger'

const getData = async (url: string, headers: any) => {
  try {
    const response = await axios.get(url, { headers })
    return response.data
  } catch (error) {
    errorLogger(`Failed to GET data from ${url}`, error)
    throw error
  }
}

export { getData }
