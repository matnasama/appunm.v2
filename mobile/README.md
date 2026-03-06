# Mobile App README

## Instalación

```bash
npm install
```

## Configuración importante

Antes de ejecutar la app, configura la URL del backend en `src/config/api.js`:

- **Emulador Android**: `http://10.0.2.2:3000/api`
- **Dispositivo físico**: `http://<IP-DE-TU-PC>:3000/api`
- **iOS Simulator**: `http://localhost:3000/api`

Para obtener tu IP en Windows:
```bash
ipconfig
```

## Ejecutar la app

```bash
npm start
```

Luego:
- Escanea el código QR con Expo Go
- Presiona `a` para Android
- Presiona `i` para iOS
- Presiona `w` para Web

## Estructura

```
src/
├── config/       # Configuración de la API
├── services/     # Servicios para consumir API
└── screens/      # Pantallas de la app
```

## Requisitos

- Node.js
- Expo CLI
- Expo Go app (en tu dispositivo móvil)
