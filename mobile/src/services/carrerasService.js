import api from './api';

// Obtener materias de una carrera específica
export const getCarreraDCAYT = async (carrera) => {
  try {
    const response = await api.get(`/carreras/dcayt/${carrera}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCarreraDCEYJ = async (carrera) => {
  try {
    const response = await api.get(`/carreras/dceyj/${carrera}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCarreraDHYCS = async (carrera) => {
  try {
    const response = await api.get(`/carreras/dhycs/${carrera}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener información de departamentos
export const getDepartamentoDCAYT = async () => {
  try {
    const response = await api.get('/departamentos/dcayt');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDepartamentoDCEYJ = async () => {
  try {
    const response = await api.get('/departamentos/dceyj');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDepartamentoDHYCS = async () => {
  try {
    const response = await api.get('/departamentos/dhycs');
    return response.data;
  } catch (error) {
    throw error;
  }
};
