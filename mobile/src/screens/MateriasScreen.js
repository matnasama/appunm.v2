import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { getCarreraDCAYT, getCarreraDCEYJ, getCarreraDHYCS } from '../services/carrerasService';

export default function MateriasScreen() {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [selectedCarrera, setSelectedCarrera] = useState(null);

  const departamentos = {
    DCAYT: ['ARQ', 'BIO', 'DCV', 'DDI', 'DIN', 'DMU', 'INEL', 'LGA'],
    DCEYJ: ['ABG', 'CICLO_COMUN', 'CPN', 'LADM', 'LECON', 'LRT'],
    DHYCS: ['LCS', 'LEI', 'LES', 'LTS']
  };

  const carrerasNombres = {
    ARQ: 'Arquitectura',
    BIO: 'Biotecnología',
    DCV: 'Diseño de Comunicación Visual',
    DDI: 'Diseño Industrial',
    DIN: 'Ingeniería Electrónica',
    DMU: 'Diseño Multimedial',
    INEL: 'Ingeniería Electrónica',
    LGA: 'Lic. en Gestión Ambiental',
    ABG: 'Abogacía',
    CICLO_COMUN: 'Ciclo Común',
    CPN: 'Contador Público',
    LADM: 'Lic. en Administración',
    LECON: 'Lic. en Economía',
    LRT: 'Lic. en Relaciones del Trabajo',
    LCS: 'Lic. en Comunicación Social',
    LEI: 'Lic. en Educación Inicial',
    LES: 'Lic. en Educación Secundaria',
    LTS: 'Lic. en Trabajo Social'
  };

  const fetchMaterias = async (departamento, carrera) => {
    setLoading(true);
    try {
      setError(null);
      let data;
      
      if (departamento === 'DCAYT') {
        data = await getCarreraDCAYT(carrera);
      } else if (departamento === 'DCEYJ') {
        data = await getCarreraDCEYJ(carrera);
      } else if (departamento === 'DHYCS') {
        data = await getCarreraDHYCS(carrera);
      }
      
      setMaterias(data || []);
      setSelectedCarrera(carrera);
    } catch (err) {
      setError('Error al cargar las materias. Verifica que el servidor esté funcionando.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    if (selectedDepartamento && selectedCarrera) {
      setRefreshing(true);
      fetchMaterias(selectedDepartamento, selectedCarrera);
    }
  };

  if (!selectedDepartamento) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Selecciona un Departamento</Text>
        {Object.keys(departamentos).map((dept) => (
          <TouchableOpacity
            key={dept}
            style={styles.deptCard}
            onPress={() => setSelectedDepartamento(dept)}
          >
            <Text style={styles.deptText}>{dept}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  if (!selectedCarrera) {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setSelectedDepartamento(null)}
        >
          <Text style={styles.backText}>← Volver a Departamentos</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerText}>Selecciona una Carrera</Text>
        <Text style={styles.subheaderText}>{selectedDepartamento}</Text>
        
        {departamentos[selectedDepartamento].map((carrera) => (
          <TouchableOpacity
            key={carrera}
            style={styles.carreraCard}
            onPress={() => fetchMaterias(selectedDepartamento, carrera)}
          >
            <Text style={styles.carreraText}>{carrerasNombres[carrera] || carrera}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#34C759" />
        <Text style={styles.loadingText}>Cargando materias...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            setSelectedCarrera(null);
            setError(null);
          }}
        >
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
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
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setSelectedCarrera(null)}
      >
        <Text style={styles.backText}>← Volver a Carreras</Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>{carrerasNombres[selectedCarrera] || selectedCarrera}</Text>
      <Text style={styles.subheaderText}>Materias: {materias.length}</Text>
      
      {materias.map((materia, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.codigo}>Código: {materia.Código}</Text>
            {materia.Año && (
              <Text style={styles.anio}>Año {materia.Año}</Text>
            )}
          </View>
          
          <Text style={styles.nombre}>{materia['Asignatura-Actividad']}</Text>
          
          {materia['Horas semanales teórico-prácticas'] && (
            <Text style={styles.horas}>
              ⏰ {materia['Horas semanales teórico-prácticas']} hs semanales
            </Text>
          )}
          
          {materia.Cuatrimestre && (
            <Text style={styles.cuatrimestre}>
              📅 Cuatrimestre: {materia.Cuatrimestre}
            </Text>
          )}
          
          {materia.Comisiones && materia.Comisiones.length > 0 && (
            <View style={styles.comisionesContainer}>
              <Text style={styles.comisionesTitle}>
                Comisiones disponibles: {materia.Comisiones.length}
              </Text>
              {materia.Comisiones.slice(0, 2).map((comision, idx) => (
                <View key={idx} style={styles.comisionItem}>
                  <Text style={styles.comisionText}>
                    {comision.Comisión} - {comision['Día/s y horario/s']}
                  </Text>
                  <Text style={styles.docenteText}>
                    👤 {comision['Docente/s (1)']}
                  </Text>
                  {comision['Aula/s'] && (
                    <Text style={styles.aulaText}>📍 {comision['Aula/s']}</Text>
                  )}
                </View>
              ))}
              {materia.Comisiones.length > 2 && (
                <Text style={styles.moreComisiones}>
                  +{materia.Comisiones.length - 2} comisiones más
                </Text>
              )}
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
    marginBottom: 20,
  },
  backButton: {
    padding: 15,
    marginHorizontal: 15,
    marginTop: 10,
  },
  backText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15,
    marginTop: 5,
    color: '#333',
  },
  subheaderText: {
    fontSize: 16,
    marginHorizontal: 15,
    marginBottom: 10,
    color: '#666',
  },
  deptCard: {
    backgroundColor: '#007AFF',
    margin: 15,
    marginTop: 5,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deptText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  carreraCard: {
    backgroundColor: '#34C759',
    margin: 15,
    marginTop: 5,
    padding: 18,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  carreraText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codigo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  anio: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  horas: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  cuatrimestre: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  comisionesContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  comisionesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  comisionItem: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  comisionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  docenteText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  aulaText: {
    fontSize: 12,
    color: '#666',
  },
  moreComisiones: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
