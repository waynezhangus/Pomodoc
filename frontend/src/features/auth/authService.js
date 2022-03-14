import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (user) => {
  const res = await axios.post(API_URL, user)
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data))
  }
  return res.data
}

// Login user
const login = async (user) => {
  const res = await axios.post(API_URL + 'login', user)
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data))
  }
  return res.data
}

// Update user
const update = async (user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
  const res = await axios.patch(API_URL + 'update', user, config)
  return res.data
}

// Logout user
const logout = () => localStorage.removeItem('user')

const authService = {
  register,
  login,
  update,
  logout,
}

export default authService
