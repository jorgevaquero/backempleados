const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://jorgemariomndz:jorgemariomendoza06@cluster0.dk6ghj5.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conexión a MongoDB establecida");
}).catch(err => console.error("Error al conectar a MongoDB:", err));


const empleadoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: false 
      },
        apellido:{
          type: String,
          required: false 
        },
        direccion:{
          type: String,
          required: false 
        },
        edad:{
          type: String,
          required: false 
        },
        profesion:{
          type: String,
          required: false 
        },
        estadocivil:{
          type: String,
          required: false 
        },
});
const Empleado = mongoose.model('Empleado', empleadoSchema);


app.get('/empleados', async (req, res) => {
    try {
      const empleados = await Empleado.find();
      res.json(empleados);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Crear un nuevo empleado
  app.post('/empleados', async (req, res) => {
      const newEmpleado = new Empleado(req.body);
  
      newEmpleado.save()
        .then(empleado => res.status(201).send({ empleado }))
        .catch(error => res.status(500).send({ error }));
  });

  // Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto' );
});