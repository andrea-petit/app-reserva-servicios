const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error abriendo la base de datos ' + err.message);
    } else {
        console.log('Conectado exitosamente a la base SQLite.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        nombre_usuario TEXT NOT NULL UNIQUE,
        contraseña TEXT NOT NULL,
        rol TEXT CHECK(rol IN ('cliente', 'profesional')) NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Categorias (
        id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL UNIQUE
    )`);

    db.run(`INSERT OR IGNORE INTO Categorias (nombre) VALUES ('Doctor')`);
    db.run(`INSERT OR IGNORE INTO Categorias (nombre) VALUES ('Abogado')`);
    db.run(`INSERT OR IGNORE INTO Categorias (nombre) VALUES ('Terapeuta')`);

    db.run(`CREATE TABLE IF NOT EXISTS ProfesionalCategorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER,
        id_categoria INTEGER,
        FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
        FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS PerfilProfesional (
        id_perfil INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER,
        descripcion TEXT,
        ubicacion TEXT,
        FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Disponibilidad (
        id_disponibilidad INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER,
        fecha DATE NOT NULL,
        hora_inicio TIME NOT NULL,
        hora_fin TIME NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Reservaciones (
        id_reserva INTEGER PRIMARY KEY AUTOINCREMENT,
        id_cliente INTEGER,
        id_profesional INTEGER,
        id_disponibilidad INTEGER,
        estado TEXT CHECK(estado IN ('pendiente', 'confirmada', 'cancelada')) DEFAULT 'pendiente',
        FOREIGN KEY (id_cliente) REFERENCES Usuarios(id_usuario),
        FOREIGN KEY (id_profesional) REFERENCES Usuarios(id_usuario),
        FOREIGN KEY (id_disponibilidad) REFERENCES Disponibilidad(id_disponibilidad)
    )`);
});

module.exports = db;


