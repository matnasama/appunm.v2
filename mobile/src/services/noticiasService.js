import api from './api';

// Obtener todas las noticias
export const getNoticias = async () => {
  try {
    const response = await api.get('/noticias');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener una noticia por ID
export const getNoticiaById = async (id) => {
  try {
    const response = await api.get(`/noticias/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
