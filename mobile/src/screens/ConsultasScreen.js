import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { getConsultas } from '../services/consultasService';

export default function ConsultasScreen({ navigation }) {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchConsultas = async () => {
    try {
      setError(null);
      const data = await getConsultas();
      setConsultas(data.consultas || []);
    } catch (err) {
      setError('Error al cargar las consultas. Verifica que el servidor esté funcionando.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchConsultas();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando consultas...</Text>
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
      <Text style={styles.headerText}>Consultas Frecuentes</Text>
      {consultas.map((consulta) => (
        <TouchableOpacity
          key={consulta.id}
          style={styles.card}
          onPress={() => navigation.navigate('ConsultasDetail', { consulta })}
        >
          <Text style={styles.nombre}>{consulta.nombre}</Text>
          <Text style={styles.descripcion} numberOfLines={3}>
            {consulta.descripcion}
          </Text>
          {consulta.url && (
            <Text style={styles.urlIndicator}>🔗 Tiene enlace</Text>
          )}
        </TouchableOpacity>
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
    color: '#007AFF',
  },
  descripcion: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  urlIndicator: {
    fontSize: 12,
    color: '#34C759',
    marginTop: 8,
    fontWeight: '600',
  },
});
