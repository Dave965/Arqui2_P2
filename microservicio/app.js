const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();
const PORT = 8080;

let estadoGuardar = false;
let habitacion = 10;

app.use(cors());
app.use(bodyParser.json());

const myString = `101010010101101001010101101010101010010110101010100101010101010101010010101010100101010101010101001010101010101010101010101001010101010101001010101010101010101010101001010101010101001010101010101010101010101010101001010101010101001010101010101010101010101010101001010101010101001010101010101010101010101010101001010101010101001010101010101010101010101010101001010101010101001010101010101010101000000`;

const prueba2 = `0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011000000000000000000110000000000000000011100000000000000000110000000000000000001100000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`;

const registros = [prueba2, myString];

const pool = new Pool({
  host: "db",
  port: 5432, //comentar esta linea para mysql
  user: "postgres",
  password: "123",
  database: "db_arqui",
});

const crearTabla = `CREATE TABLE IF NOT EXISTS habitaciones(
    id_Medicion SERIAL PRIMARY KEY,
    id_Habitacion INT,
    fecha TIMESTAMP,
    Cantidad_Personas INT,
    Mapa CHAR(550) 
    )
`;

pool.query(crearTabla, (error, results) => {
  if (error) {
    console.error("No se pudo manito :c");
  } else {
    console.log("Tabla creada todo OK");
  }
});

app.post("/insertarMedicion", async (req, res) => {
  try {
    const { fecha, cantidad_personas, mapa } = req.body;
    const id_Habitacion = habitacion;

    if (id_Habitacion === 10) {
      throw new Error("Seleccione una habitacion");
    }
    if (estadoGuardar === false) {
      throw new Error("active el guardado");
    }

    const query = `
        INSERT INTO habitaciones (id_Habitacion, fecha, Cantidad_Personas, Mapa)
        VALUES ($1, $2, $3, $4)
      `;
    const values = [id_Habitacion, fecha, cantidad_personas, mapa];

    await pool.query(query, values);

    res.status(200).send("Datos insertados correctamente");
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

function generarJsonDesdeString(registros) {
  const resultado = {
    series: [],
  };
  const matriz = [];
  let mas_alto = 0;

  for (let i = 0; i < 20; i++) {
    let lin = [];
    for (let j = 0; j < 20; j++) {
      lin.push(0);
    }
    matriz.push(lin);
  }

  for (str of registros) {
    let lineas = [];
    for (let i = 0; i < str.length; i += 20) {
      lineas.push(str.substring(i, i + 20));
    }

    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        matriz[i][j] += parseInt(lineas[i][j]);
      }
    }
  }

  for (let linea of matriz) {
    mayor_linea = Math.max(...linea);
    if (mayor_linea > mas_alto) {
      mas_alto = mayor_linea;
    }
  }

  for (let i = 0; i < matriz.length; i++) {
    let linea = matriz[i];
    serie = {
      name: i,
      data: [],
    };
    for (let j = 0; j < linea.length; j++) {
      valor = linea[j];
      porcenUno = mas_alto > 0 ? (valor / mas_alto) : 0;
      dato = {};
      serie.data.push({ x: j, y: porcenUno });
    }
    resultado.series.push(serie);
  }

  resultado.series = resultado.series.reverse();

  return resultado;
}

app.get("/obtener-json", (req, res) => {
  const jsonResultado = generarJsonDesdeString(registros);
  res.json(jsonResultado);
});

app.get("/tiempo-real", (req, res) => {
  const query = `
    select p.Mapa from habitaciones p
    where id_Habitacion = $1
    `;
  pool.query(query, [habitacion], (error, results) => {
    if (error) {
      console.error("no sale la busqueda aaaaaaaaiudaaaaaa", error);
    } else {
      const mapas = results.rows.map(row => row.mapa);
      res.json(generarJsonDesdeString(mapas));
    }
  });
});

app.post("/historico", (req, res) => {
  const { fechaInicio, fechaFin } = req.body;

  const query = `
      SELECT p.Mapa
      FROM habitaciones p
      WHERE id_Habitacion = $1
      AND fecha BETWEEN $2 AND $3
    `;

  pool.query(query, [habitacion, fechaInicio, fechaFin], (error, results) => {
    if (error) {
      console.error("aaaaaawxili0:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      const mapas = results.rows.map(row => row.mapa);
      res.json(generarJsonDesdeString(mapas));
    }
  });
});

app.get("/confirmar-cambio", (req, res) => {
  estadoGuardar = true;
  res.send(`El estado ahora es: ${estadoGuardar}`);
});

app.get("/consultar-estado", (req, res) => {
  res.send(`${estadoGuardar}`);
});

app.get("/consultar-habitacion", (req, res) => {
  res.send(`${habitacion}`);
});

app.get("/ultimos-registros", async (req, res) => {
  try {
    const query = `
      SELECT h.cantidad_personas
      FROM habitaciones h
      INNER JOIN (
        SELECT id_Habitacion, MAX(fecha) AS max_fecha
        FROM habitaciones
        GROUP BY id_Habitacion
      ) ultimos ON h.id_Habitacion = ultimos.id_Habitacion AND h.fecha = ultimos.max_fecha
      ORDER BY h.id_Habitacion;
    `;

    const { rows } = await pool.query(query);
    const cantidadPersonas = rows.map(row => row.cantidad_personas);

    res.json(cantidadPersonas);
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/cambiar-habitacion/:noHabitacion", (req, res) => {
  const { noHabitacion } = req.params;
  const numero = parseInt(noHabitacion);
  if (numero >= 0 && numero <= 4) {
    estadoGuardar = false;
    habitacion = numero;
    res.json({ mensaje: "Habitación cambiada exitosamente", habitacion });
  } else {
    res.status(400).json({ error: "Número de habitación inválido" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
