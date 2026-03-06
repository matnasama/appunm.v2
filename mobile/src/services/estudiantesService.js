import api from './api';

// Obtener todos los estudiantes
export const getEstudiantes = async () => {
  try {
    const response = await api.get('/estudiantes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener un estudiante por ID
export const getEstudianteById = async (id) => {
  try {
    const response = await api.get(`/estudiantes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
