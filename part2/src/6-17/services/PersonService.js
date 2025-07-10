import axios from 'axios'
const baseURL = 'https://phonebook-api-fdwy.onrender.com/api'

const getAll = () => {
  const request = axios.get(`${baseURL}/contacts`)
  return request.then(response => response.data)
}

const getInfo = () => {
  const request = axios.get(`${baseURL}/info`)
  return request.then(response => response.data)
}

const create = (newPerson) => {
  const request = axios.post(`${baseURL}/contacts`, newPerson)
  return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
  const request = axios.put(`${baseURL}/contacts/${id}`, updatedPerson)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseURL}/contacts/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove, getInfo }