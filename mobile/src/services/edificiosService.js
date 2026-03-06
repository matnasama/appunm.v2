import api from './api';

// Obtener todos los edificios
export const getEdificios = async () => {
  try {
    const response = await api.get('/edificios');
    return response.data;
  } catch (error) {
    throw error;
  }
};
