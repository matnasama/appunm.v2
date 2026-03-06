# 🎓 UNM App v2

Aplicación móvil con backend basado en JSON para evitar límites de consultas en GitHub Raw.

## 📋 Descripción

Este proyecto contiene:
- **Backend**: Servidor Express.js con API REST que sirve datos desde archivos JSON
- **Mobile**: Aplicación móvil desarrollada con React Native y Expo

## 🏗️ Estructura del Proyecto

```
appunm.v2/
├── backend/           # Servidor Node.js con Express
│   ├── data/         # Archivos JSON con los datos
│   ├── server.js     # Servidor principal
│   └── package.json
└── mobile/           # Aplicación móvil React Native
    ├── src/
    │   ├── screens/  # Pantallas de la app
    │   ├── services/ # Servicios para consumir API
    │   └── config/   # Configuración
    ├── App.js
    └── package.json
```

## 🚀 Instalación y Configuración

### Backend

1. Navega a la carpeta del backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor:
```bash
npm start
```

El servidor estará corriendo en `http://localhost:3000`

### Mobile

1. Navega a la carpeta mobile:
```bash
cd mobile
```

2. Instala las dependencias:
```bash
npm install
```

3. **IMPORTANTE**: Configura la URL de la API en `mobile/src/config/api.js`:
   - Para emulador de Android: `http://10.0.2.2:3000/api`
   - Para dispositivo físico: `http://<IP-DE-TU-PC>:3000/api`
   - Para iOS Simulator: `http://localhost:3000/api`

4. Inicia la aplicación:
```bash
npm start
```

5. Escanea el código QR con Expo Go (Android/iOS) o presiona:
   - `a` para Android
   - `i` para iOS
   - `w` para Web

## 📱 Características de la App

- **Inicio**: Pantalla principal con acceso rápido
- **Consultas**: Preguntas frecuentes y consultas académicas
- **Materias**: Navegación por departamentos y carreras con información detallada de materias y comisiones
- **Enlaces**: Enlaces útiles a sistemas y plataformas de la UNM
- **Contactos**: Directorio de contactos de departamentos y áreas

## 🔌 Endpoints de la API

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/` | GET | Información de la API |
| `/api/consultas` | GET | Lista de consultas frecuentes |
| `/api/consultas/:id` | GET | Consulta por ID |
| `/api/enlaces` | GET | Enlaces útiles |
| `/api/edificios` | GET | Edificios y aulas |
| `/api/internos` | GET | Teléfonos internos |
| `/api/info/contactos` | GET | Directorio de contactos |
| `/api/info/programas` | GET | Programas de materias |
| `/api/info/calendario-grado` | GET | Calendario académico |
| `/api/info/formularios` | GET | Formularios disponibles |
| `/api/info/plan-estudios-enlaces` | GET | Enlaces a planes de estudio |
| `/api/info/unm-virtual` | GET | Info de UNM Virtual |
| `/api/carreras/dcayt/:carrera` | GET | Materias de carrera DCAYT |
| `/api/carreras/dceyj/:carrera` | GET | Materias de carrera DCEYJ |
| `/api/carreras/dhycs/:carrera` | GET | Materias de carrera DHYCS |
| `/api/departamentos/dcayt` | GET | Info departamento DCAYT |
| `/api/departamentos/dceyj` | GET | Info departamento DCEYJ |
| `/api/departamentos/dhycs` | GET | Info departamento DHYCS |
| `/api/reportes-auxiliares` | GET | Reportes auxiliares UNM |

## 📝 Datos JSON

Los archivos JSON están en `backend/data/`:
- `data.json` - Consultas frecuentes
- `enlaces.json` - Enlaces útiles
- `edificios.json` - Edificios y aulas
- `internos.json` - Teléfonos internos
- `reportes_unm_auxiliares.json` - Reportes
- `DCAYT/` - Carreras del Dpto. de Ciencias Aplicadas y Tecnología
- `DCEYJ/` - Carreras del Dpto. de Ciencias Económicas y Jurídicas
- `DHYCS/` - Carreras del Dpto. de Humanidades y Ciencias Sociales
- `Global/` - Información por departamento
- `info/` - Información general (contactos, programas, calendarios, etc.)

Puedes modificar estos archivos para actualizar los datos sin necesidad de reiniciar el servidor.

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- CORS

### Mobile
- React Native
- Expo
- React Navigation
- Axios

## 📦 Scripts Disponibles

### Backend
```bash
npm start        # Inicia el servidor
npm run dev      # Inicia con nodemon (desarrollo)
```

### Mobile
```bash
npm start        # Inicia Expo
npm run android  # Abre en Android
npm run ios      # Abre en iOS
npm run web      # Abre en navegador
```

## 🔧 Desarrollo

Para agregar nuevos endpoints:
1. Crea un archivo JSON en `backend/data/`
2. Agrega las rutas en `backend/server.js`
3. Crea un servicio en `mobile/src/services/`
4. Implementa la pantalla correspondiente

## 📄 Licencia

MIT

## 👨‍💻 Autor

Universidad Nacional de México (UNM)

---

**Nota**: Recuerda mantener actualizados los archivos JSON y asegurarte de que el backend esté corriendo antes de usar la aplicación móvil.
