import axios from 'axios'

const getData = async (url: string, headers: any) => {
  const response = await axios.get(url, { headers })
  return response.data
}

export { getData }
