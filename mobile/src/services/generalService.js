import api from './api';

// Obtener internos
export const getInternos = async () => {
  try {
    const response = await api.get('/internos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener reportes auxiliares
export const getReportesAuxiliares = async () => {
  try {
    const response = await api.get('/reportes-auxiliares');
    return response.data;
  } catch (error) {
    throw error;
  }
};
