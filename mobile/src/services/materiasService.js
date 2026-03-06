import api from './api';

// Obtener todas las materias
export const getMaterias = async () => {
  try {
    const response = await api.get('/materias');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener una materia por ID
export const getMateriaById = async (id) => {
  try {
    const response = await api.get(`/materias/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
