import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, Linking } from 'react-native';
import { getEnlaces } from '../services/enlacesService';

export default function EnlacesScreen() {
  const [enlaces, setEnlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchEnlaces = async () => {
    try {
      setError(null);
      const data = await getEnlaces();
      setEnlaces(data.sitios || []);
    } catch (err) {
      setError('Error al cargar los enlaces. Verifica que el servidor esté funcionando.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEnlaces();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEnlaces();
  };

  const handleOpenUrl = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error al abrir URL:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF9500" />
        <Text style={styles.loadingText}>Cargando enlaces...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.headerText}>Enlaces Útiles</Text>
      {enlaces.map((enlace) => (
        <View key={enlace.id} style={styles.card}>
          <TouchableOpacity onPress={() => handleOpenUrl(enlace.url)}>
            <Text style={styles.nombre}>{enlace.nombre}</Text>
            <Text style={styles.url}>{enlace.url}</Text>
            {enlace.email && (
              <Text style={styles.email}>📧 {enlace.email}</Text>
            )}
          </TouchableOpacity>
          
          {enlace.subcategorias && enlace.subcategorias.length > 0 && (
            <View style={styles.subcategoriasContainer}>
              <Text style={styles.subcategoriasTitle}>Subcategorías:</Text>
              {enlace.subcategorias.map((sub, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.subcategoriaItem}
                  onPress={() => handleOpenUrl(sub.enlace)}
                >
                  <Text style={styles.subcategoriaNombre}>{sub.nombre}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    margin: 15,
    marginTop: 5,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FF9500',
  },
  url: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 5,
  },
  email: {
    fontSize: 12,
    color: '#666',
  },
  subcategoriasContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  subcategoriasTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  subcategoriaItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginBottom: 5,
  },
  subcategoriaNombre: {
    fontSize: 13,
    color: '#007AFF',
  },
});
