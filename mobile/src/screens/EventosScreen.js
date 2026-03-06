import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { getEventos } from '../services/eventosService';

export default function EventosScreen() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchEventos = async () => {
    try {
      setError(null);
      const data = await getEventos();
      setEventos(data.eventos || []);
    } catch (err) {
      setError('Error al cargar los eventos. Verifica que el servidor esté funcionando.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEventos();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#AF52DE" />
        <Text style={styles.loadingText}>Cargando eventos...</Text>
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
      <Text style={styles.headerText}>Próximos Eventos</Text>
      {eventos.map((evento) => (
        <View key={evento.id} style={styles.card}>
          <View style={styles.categoriaBadge}>
            <Text style={styles.categoriaText}>{evento.categoria}</Text>
          </View>
          
          <Text style={styles.titulo}>{evento.titulo}</Text>
          <Text style={styles.descripcion}>{evento.descripcion}</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.icon}>📅</Text>
            <Text style={styles.detailText}>{evento.fecha}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.icon}>⏰</Text>
            <Text style={styles.detailText}>
              {evento.horaInicio} - {evento.horaFin}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.icon}>📍</Text>
            <Text style={styles.detailText}>{evento.lugar}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.icon}>👤</Text>
            <Text style={styles.detailText}>{evento.organizador}</Text>
          </View>
          
          {evento.inscripcionRequerida && (
            <View style={styles.inscripcionBadge}>
              <Text style={styles.inscripcionText}>
                Inscripción requerida
                {evento.cupoLimitado && ` - Cupo: ${evento.cupoLimitado}`}
              </Text>
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
  categoriaBadge: {
    backgroundColor: '#AF52DE',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoriaText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  descripcion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  inscripcionBadge: {
    backgroundColor: '#FFF3CD',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  inscripcionText: {
    fontSize: 12,
    color: '#856404',
    fontWeight: '600',
  },
});
