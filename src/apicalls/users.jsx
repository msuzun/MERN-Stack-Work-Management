import { apiRequest } from './index.jsx';

export const RegisterUser = async (payload) => apiRequest('post','api/users/register',payload);
export const LoginUser = async (payload) => apiRequest('post','api/users/login',payload);