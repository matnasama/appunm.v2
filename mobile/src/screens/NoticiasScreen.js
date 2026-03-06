import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { getNoticias } from '../services/noticiasService';

export default function NoticiasScreen({ navigation }) {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchNoticias = async () => {
    try {
      setError(null);
      const data = await getNoticias();
      setNoticias(data.noticias || []);
    } catch (err) {
      setError('Error al cargar las noticias. Verifica que el servidor esté funcionando.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNoticias();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF9500" />
        <Text style={styles.loadingText}>Cargando noticias...</Text>
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
      <Text style={styles.headerText}>Últimas Noticias</Text>
      {noticias.map((noticia) => (
        <TouchableOpacity
          key={noticia.id}
          style={styles.card}
          onPress={() => navigation.navigate('NoticiasDetail', { noticia })}
        >
          {noticia.destacada && (
            <View style={styles.destacadaBadge}>
              <Text style={styles.destacadaText}>Destacada</Text>
            </View>
          )}
          <Text style={styles.titulo}>{noticia.titulo}</Text>
          <Text style={styles.descripcion} numberOfLines={3}>
            {noticia.descripcion}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.categoria}>{noticia.categoria}</Text>
            <Text style={styles.fecha}>{noticia.fecha}</Text>
          </View>
          <Text style={styles.autor}>Por: {noticia.autor}</Text>
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
  destacadaBadge: {
    backgroundColor: '#FF3B30',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  destacadaText: {
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
    marginBottom: 10,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoria: {
    fontSize: 12,
    color: '#FF9500',
    fontWeight: '600',
  },
  fecha: {
    fontSize: 12,
    color: '#999',
  },
  autor: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});
