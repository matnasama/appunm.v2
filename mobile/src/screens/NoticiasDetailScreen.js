import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function NoticiasDetailScreen({ route }) {
  const { noticia } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {noticia.destacada && (
          <View style={styles.destacadaBadge}>
            <Text style={styles.destacadaText}>Destacada</Text>
          </View>
        )}
        
        <Text style={styles.titulo}>{noticia.titulo}</Text>
        
        <View style={styles.metaContainer}>
          <Text style={styles.categoria}>{noticia.categoria}</Text>
          <Text style={styles.fecha}>{noticia.fecha}</Text>
        </View>
        
        <Text style={styles.autor}>Por: {noticia.autor}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.descripcion}>{noticia.descripcion}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
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
    marginBottom: 15,
  },
  destacadaText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    lineHeight: 30,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoria: {
    fontSize: 14,
    color: '#FF9500',
    fontWeight: '600',
  },
  fecha: {
    fontSize: 14,
    color: '#999',
  },
  autor: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 20,
  },
  descripcion: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
