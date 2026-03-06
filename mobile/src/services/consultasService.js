import api from './api';

// Obtener todas las consultas
export const getConsultas = async () => {
  try {
    const response = await api.get('/consultas');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener una consulta por ID
export const getConsultaById = async (id) => {
  try {
    const response = await api.get(`/consultas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
