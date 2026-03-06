import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { getHorarios } from '../services/horariosService';

export default function HorariosScreen() {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchHorarios = async () => {
    try {
      setError(null);
      const data = await getHorarios();
      setHorarios(data.horarios || []);
    } catch (err) {
      setError('Error al cargar los horarios. Verifica que el servidor esté funcionando.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHorarios();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHorarios();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#34C759" />
        <Text style={styles.loadingText}>Cargando horarios...</Text>
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
      <Text style={styles.headerText}>Horarios del Periodo</Text>
      {horarios.map((horario) => (
        <View key={horario.id} style={styles.card}>
          <Text style={styles.materiaNombre}>{horario.materiaNombre}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Profesor:</Text>
            <Text style={styles.value}>{horario.profesor}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Días:</Text>
            <Text style={styles.value}>{horario.dias.join(', ')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Horario:</Text>
            <Text style={styles.value}>
              {horario.horaInicio} - {horario.horaFin}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Aula:</Text>
            <Text style={styles.value}>{horario.aula}</Text>
          </View>
          <View style={styles.periodoBadge}>
            <Text style={styles.periodoText}>{horario.periodo}</Text>
          </View>
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
  materiaNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#34C759',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 80,
  },
  value: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  periodoBadge: {
    backgroundColor: '#34C759',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 8,
  },
  periodoText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
