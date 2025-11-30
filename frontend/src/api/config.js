export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8084';

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
