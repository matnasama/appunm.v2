const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read JSON files
const readJSONFile = (filename) => {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'API Backend UNM',
    version: '2.0.0',
    endpoints: {
      consultas: '/api/consultas',
      enlaces: '/api/enlaces',
      edificios: '/api/edificios',
      internos: '/api/internos',
      contactos: '/api/info/contactos',
      programas: '/api/info/programas',
      calendarioGrado: '/api/info/calendario-grado',
      formularios: '/api/info/formularios',
      planEstudios: '/api/info/plan-estudios-enlaces',
      unmVirtual: '/api/info/unm-virtual',
      carreras: {
        DCAYT: '/api/carreras/dcayt/:carrera',
        DCEYJ: '/api/carreras/dceyj/:carrera',
        DHYCS: '/api/carreras/dhycs/:carrera'
      },
      departamentos: {
        DCAYT: '/api/departamentos/dcayt',
        DCEYJ: '/api/departamentos/dceyj',
        DHYCS: '/api/departamentos/dhycs'
      }
    }
  });
});

// Consultas
app.get('/api/consultas', (req, res) => {
  const data = readJSONFile('data.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer datos de consultas' });
  }
});

app.get('/api/consultas/:id', (req, res) => {
  const data = readJSONFile('data.json');
  if (data && data.consultas) {
    const consulta = data.consultas.find(c => c.id === parseInt(req.params.id));
    if (consulta) {
      res.json(consulta);
    } else {
      res.status(404).json({ error: 'Consulta no encontrada' });
    }
  } else {
    res.status(500).json({ error: 'Error al leer datos' });
  }
});

// Enlaces
app.get('/api/enlaces', (req, res) => {
  const data = readJSONFile('enlaces.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer datos de enlaces' });
  }
});

// Edificios
app.get('/api/edificios', (req, res) => {
  const data = readJSONFile('edificios.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer datos de edificios' });
  }
});

// Internos
app.get('/api/internos', (req, res) => {
  const data = readJSONFile('internos.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer datos de internos' });
  }
});

// Info - Contactos
app.get('/api/info/contactos', (req, res) => {
  const data = readJSONFile('info/contactos.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer datos de contactos' });
  }
});

// Info - Programas
app.get('/api/info/programas', (req, res) => {
  const data = readJSONFile('info/programas.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer datos de programas' });
  }
});

// Info - Calendario Grado
app.get('/api/info/calendario-grado', (req, res) => {
  const data = readJSONFile('info/calendarioGrado.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer calendario de grado' });
  }
});

// Info - Formularios
app.get('/api/info/formularios', (req, res) => {
  const data = readJSONFile('info/formularios.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer formularios' });
  }
});

// Info - Plan de Estudios Enlaces
app.get('/api/info/plan-estudios-enlaces', (req, res) => {
  const data = readJSONFile('info/plan_estudios_enlaces.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer plan de estudios' });
  }
});

// Info - UNM Virtual
app.get('/api/info/unm-virtual', (req, res) => {
  const data = readJSONFile('info/unmvirtual.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer UNM Virtual' });
  }
});

// Info - Data general
app.get('/api/info/data', (req, res) => {
  const data = readJSONFile('info/data.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer data de info' });
  }
});

// Carreras DCAYT
app.get('/api/carreras/dcayt/:carrera', (req, res) => {
  const carrera = req.params.carrera.toUpperCase();
  const data = readJSONFile(`DCAYT/${carrera}.json`);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Carrera no encontrada' });
  }
});

// Carreras DCEYJ
app.get('/api/carreras/dceyj/:carrera', (req, res) => {
  const carrera = req.params.carrera.toUpperCase();
  const data = readJSONFile(`DCEYJ/${carrera}.json`);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Carrera no encontrada' });
  }
});

// Carreras DHYCS
app.get('/api/carreras/dhycs/:carrera', (req, res) => {
  const carrera = req.params.carrera.toUpperCase();
  const data = readJSONFile(`DHYCS/${carrera}.json`);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Carrera no encontrada' });
  }
});

// Departamentos Global
app.get('/api/departamentos/dcayt', (req, res) => {
  const data = readJSONFile('Global/DCAYT.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer datos de DCAYT' });
  }
});

app.get('/api/departamentos/dceyj', (req, res) => {
  const data = readJSONFile('Global/DCEYJ.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer datos de DCEYJ' });
  }
});

app.get('/api/departamentos/dhycs', (req, res) => {
  const data = readJSONFile('Global/DHYCS.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer datos de DHYCS' });
  }
});

// Reportes UNM Auxiliares
app.get('/api/reportes-auxiliares', (req, res) => {
  const data = readJSONFile('reportes_unm_auxiliares.json');
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error al leer reportes auxiliares' });
  }
});

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📁 Sirviendo datos desde: ${path.join(__dirname, 'data')}`);
});
