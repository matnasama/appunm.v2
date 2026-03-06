import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import ConsultasScreen from './src/screens/ConsultasScreen';
import ConsultasDetailScreen from './src/screens/ConsultasDetailScreen';
import EnlacesScreen from './src/screens/EnlacesScreen';
import MateriasScreen from './src/screens/MateriasScreen';
import ContactosScreen from './src/screens/ContactosScreen';
import EdificiosScreen from './src/screens/EdificiosScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator para Consultas
function ConsultasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ConsultasList" 
        component={ConsultasScreen}
        options={{ title: 'Consultas' }}
      />
      <Stack.Screen 
        name="ConsultasDetail" 
        component={ConsultasDetailScreen}
        options={{ title: 'Detalle' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: true,
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Inicio' }}
        />
        <Tab.Screen 
          name="Consultas" 
          component={ConsultasStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Materias" 
          component={MateriasScreen}
          options={{ title: 'Materias' }}
        />
        <Tab.Screen 
          name="Enlaces" 
          component={EnlacesScreen}
          options={{ title: 'Enlaces' }}
        />
        <Tab.Screen 
          name="Contactos" 
          component={ContactosScreen}
          options={{ title: 'Contactos' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
