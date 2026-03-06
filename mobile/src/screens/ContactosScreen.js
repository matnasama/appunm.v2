import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, Linking } from 'react-native';
import { getContactos } from '../services/infoService';

export default function ContactosScreen() {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchContactos = async () => {
    try {
      setError(null);
      const data = await getContactos();
      setContactos(data || []);
    } catch (err) {
      setError('Error al cargar los contactos. Verifica que el servidor esté funcionando.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContactos();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchContactos();
  };

  const handleEmail = async (email) => {
    try {
      await Linking.openURL(`mailto:${email}`);
    } catch (error) {
      console.error('Error al abrir email:', error);
    }
  };

  const renderContacto = (contacto) => {
    if (Array.isArray(contacto)) {
      return contacto.map((email, index) => (
        <TouchableOpacity 
          key={index}
          style={styles.emailButton}
          onPress={() => handleEmail(email)}
        >
          <Text style={styles.emailText}>📧 {email}</Text>
        </TouchableOpacity>
      ));
    } else {
      return (
        <TouchableOpacity 
          style={styles.emailButton}
          onPress={() => handleEmail(contacto)}
        >
          <Text style={styles.emailText}>📧 {contacto}</Text>
        </TouchableOpacity>
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#AF52DE" />
        <Text style={styles.loadingText}>Cargando contactos...</Text>
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
      <Text style={styles.headerText}>Directorio de Contactos</Text>
      {contactos.map((contacto, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.nombre}>{contacto.nombre}</Text>
          {renderContacto(contacto.contacto)}
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
    marginBottom: 10,
    color: '#AF52DE',
  },
  emailButton: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  emailText: {
    fontSize: 14,
    color: '#007AFF',
  },
});
