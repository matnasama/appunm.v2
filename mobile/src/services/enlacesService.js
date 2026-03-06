import api from './api';

// Obtener todos los enlaces
export const getEnlaces = async () => {
  try {
    const response = await api.get('/enlaces');
    return response.data;
  } catch (error) {
    throw error;
  }
};
