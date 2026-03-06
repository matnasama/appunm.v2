import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { getEdificios } from '../services/edificiosService';

export default function EdificiosScreen() {
  const [edificios, setEdificios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchEdificios = async () => {
    try {
      setError(null);
      const data = await getEdificios();
      setEdificios(data || []);
    } catch (err) {
      setError('Error al cargar los edificios. Verifica que el servidor esté funcionando.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEdificios();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEdificios();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#34C759" />
        <Text style={styles.loadingText}>Cargando edificios...</Text>
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
      <Text style={styles.headerText}>Edificios y Aulas</Text>
      {edificios.map((edificio, index) => (
        <View key={index} style={styles.card}>
          <View style={[styles.colorBadge, { backgroundColor: edificio.color || '#999' }]}>
            <Text style={styles.colorText}>{edificio.nombre}</Text>
          </View>
          
          {edificio.aulas && edificio.aulas.length > 0 ? (
            <View style={styles.aulasContainer}>
              <Text style={styles.aulasTitle}>Aulas ({edificio.aulas.length}):</Text>
              <View style={styles.aulasGrid}>
                {edificio.aulas.slice(0, 12).map((aula, idx) => (
                  <View key={idx} style={styles.aulaItem}>
                    <Text style={styles.aulaText}>{aula}</Text>
                  </View>
                ))}
                {edificio.aulas.length > 12 && (
                  <Text style={styles.moreText}>+{edificio.aulas.length - 12} más</Text>
                )}
              </View>
            </View>
          ) : (
            <Text style={styles.noAulasText}>Sin aulas registradas</Text>
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
  colorBadge: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  colorText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  aulasContainer: {
    marginTop: 5,
  },
  aulasTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  aulasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  aulaItem: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  aulaText: {
    fontSize: 12,
    color: '#333',
  },
  noAulasText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  moreText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
  },
});
