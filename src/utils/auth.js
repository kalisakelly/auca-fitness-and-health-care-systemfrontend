// src/utils/auth.js
import * as jwt_decode from 'jwt-decode';

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  
  try {
    const decodedToken = jwt_decode(token);
    return decodedToken?.id; // Adjust based on your token payload structure
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};
