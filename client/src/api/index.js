import axios from 'axios'

const API = axios.create({ baseURL: 'https://udyam-well-assignment-p198.vercel.app' })
API.interceptors.request.use((req) => {
    
    if (localStorage.getItem('user')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    }
    return req;
  });

export const signupUser = (userData) => API.post('/users/sign-up', userData)
export const loginUser = (userData) => API.post('/users/login', userData)
export const resetPassword = (token, password) => API.post('/users/reset-password/'+token, password)
export const forgotPassword = (email) => API.post('/users/forgot-password', email)