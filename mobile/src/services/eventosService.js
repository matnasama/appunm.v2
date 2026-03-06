import api from './api';

// Obtener todos los eventos
export const getEventos = async () => {
  try {
    const response = await api.get('/eventos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener un evento por ID
export const getEventoById = async (id) => {
  try {
    const response = await api.get(`/eventos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
