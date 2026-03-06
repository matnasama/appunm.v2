import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default function ConsultasDetailScreen({ route }) {
  const { consulta } = route.params;

  const handleOpenUrl = async (url) => {
    if (url) {
      try {
        await Linking.openURL(url);
      } catch (error) {
        console.error('Error al abrir URL:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>{consulta.nombre}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.descripcion}>{consulta.descripcion}</Text>
        
        {consulta.url && (
          <TouchableOpacity 
            style={styles.urlButton}
            onPress={() => handleOpenUrl(consulta.url)}
          >
            <Text style={styles.urlButtonText}>🔗 Abrir enlace</Text>
          </TouchableOpacity>
        )}
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
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#007AFF',
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
  urlButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  urlButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
