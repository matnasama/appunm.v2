import api from './api';

// Obtener todos los horarios
export const getHorarios = async () => {
  try {
    const response = await api.get('/horarios');
    return response.data;
  } catch (error) {
    throw error;
  }
};
