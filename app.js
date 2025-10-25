const express = require('express');
const app = express();

const PORT = 3003;

app.use(express.json());

let equipos = [];
let confederaciones = ["Concacaf", "Comebol", "Euro"];
let jugadores = [];


app.get('/', (req, res) => {
    res.send('API de Álbum panini');
});

// Mostrar equipos
app.get('/panini/all-team', (req, res) => {
    res.json(equipos);
});

// Mostrar un equipo
app.get('/panini/team/:value', (req, res) => {
	const id = parseInt(req.params.value);
    res.json(equipos.find((team) => team.id === id));
});

// Mostrar confederaciones
app.get('/panini/all-confederation', (req, res) => {
    res.json(confederaciones);
});

// Mostrar jugadores
app.get('/panini/all-player', (req, res) => {
    res.json(jugadores);
});

// Mostrar un jugador
app.get('/panini/player/:value', (req, res) => {
	const id = parseInt(req.params.value);
    res.json(jugadores.find((player) => player.id === id));
});


// Agregar equipos
app.post('/panini/team', (req, res) => {

	let datos = req.body;
	const team = {
		id: (equipos.length + 1),
		pais: datos.pais,
		confederacion: datos.confederacion,
		victorias: parseInt(datos.victorias),
		escudo: datos.escudo
	};

	if (!team.pais) return res.status(400).send('No se agregó país para el equipo');
	if (!(confederaciones.includes(team.confederacion))) return res.status(400).send('La confederación del equipo no existe');
	if (!team.victorias) return res.status(400).send('No se agregó numero de veces campeón del mundo para el equipo');
	if (!team.escudo) return res.status(400).send('No se agregó escudo para el equipo');

	equipos.push(team);
	res.status(201).json({ message: 'Equipo agregado', equipos });
});

// Agregar confederaciones
app.post('/panini/confederation', (req, res) => {
    const { confederation } = req.body;
    if (!confederation) return res.status(400).send('No se agregó confederación');
    confederaciones.push(confederation);
    res.status(201).json({ message: 'Confederación agregada', confederaciones });
});

// Agregar jugadores
app.post('/panini/player', (req, res) => {

	let datos = req.body;
	const player = {
		id: (jugadores.length + 1),
		nombre : datos.nombre,
		edad : parseInt(datos.edad),
		equipo : parseInt(datos.equipo),
		urlImagen : datos.urlImagen,
		dribling : datos.dribling,
		velocidad : datos.velocidad,
		regate : datos.regate,
		estadísticas : datos.estadísticas
	};

	if (!player.nombre) return res.status(400).send('No se agregó nombre para el jugador');
	if (!(equipos.some((equipo) => equipo.id === player.equipo))) return res.status(400).send('El equipo del jugador no existe');
	if (!player.edad) return res.status(400).send('No se agregó edad para el jugador');
	if (!player.urlImagen) return res.status(400).send('No se agregó imagen para el jugador');
	if (!player.dribling) return res.status(400).send('No se agregó dribling para el jugador');
	if (!player.velocidad) return res.status(400).send('No se agregó velocidad para el jugador');
	if (!player.regate) return res.status(400).send('No se agregó regate para el jugador');
	if (!player.estadísticas) return res.status(400).send('No se agregó estadísticas para el jugador');

	jugadores.push(player);
	res.status(201).json({ message: 'Jugador agregado', jugadores });
});


app.listen(PORT, () => {
    console.log(`API de Álbum panini corriendo en http://localhost:${PORT}`);
});