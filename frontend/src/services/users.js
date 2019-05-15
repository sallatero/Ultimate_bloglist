import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async (userId, newVersion, token) => {
  try {
    const config = {
      headers: { Authorization: `bearer ${token}` },
    }
    const response = await axios.put(`${baseUrl}/${userId}`, newVersion, config)
    return response.data
  } catch (error) {
    console.log('error: ', error)
    if (error.response.status === 401) {
      return error.response.status
    }
  }
}

export default { getAll, update }
