import api from './api';

// Obtener todos los contactos
export const getContactos = async () => {
  try {
    const response = await api.get('/info/contactos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener programas
export const getProgramas = async () => {
  try {
    const response = await api.get('/info/programas');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener calendario de grado
export const getCalendarioGrado = async () => {
  try {
    const response = await api.get('/info/calendario-grado');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener formularios
export const getFormularios = async () => {
  try {
    const response = await api.get('/info/formularios');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener plan de estudios enlaces
export const getPlanEstudiosEnlaces = async () => {
  try {
    const response = await api.get('/info/plan-estudios-enlaces');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener UNM Virtual
export const getUnmVirtual = async () => {
  try {
    const response = await api.get('/info/unm-virtual');
    return response.data;
  } catch (error) {
    throw error;
  }
};
