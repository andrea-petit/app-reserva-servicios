const db = require('../database/db');

const UserModel = {
    
    registerUser: (userData) => {
        return new Promise((resolve, reject) => {
            const { nombre, apellido, nombre_usuario, contraseña, rol, categoria } = userData;

            
            const sqlUser = `INSERT INTO Usuarios (nombre, apellido, nombre_usuario, contraseña, rol) VALUES (?, ?, ?, ?, ?)`;
            db.run(sqlUser, [nombre, apellido, nombre_usuario, contraseña, rol], function (err) {
                if (err) {
                    if (err.code === 'SQLITE_CONSTRAINT') {
                        return reject(new Error('El nombre de usuario ya está en uso.'));
                    }
                    return reject(err);
                }

                const id_usuario = this.lastID;

                
                if (rol === 'profesional' && categoria) {
                    console.log('Intentando asociar profesional a categoría:', categoria);
                    db.get(`SELECT id_categoria FROM Categorias WHERE nombre = ?`, [categoria], (err, row) => {
                        if (err) {
                            console.error('Error buscando categoría:', err);
                            return reject(err);
                        }
                        if (!row) {
                            console.error('Categoría no encontrada:', categoria);
                            return reject(new Error('Categoría no encontrada'));
                        }

                        db.run(
                            `INSERT INTO ProfesionalCategorias (id_usuario, id_categoria) VALUES (?, ?)`,
                            [id_usuario, row.id_categoria],
                            function (err) {
                                if (err) {
                                    console.error('Error insertando en ProfesionalCategorias:', err);
                                    return reject(err);
                                }
                                console.log('¡Profesional asociado a categoría!', id_usuario, row.id_categoria);
                                resolve({ id_usuario });
                            }
                        );
                    });
                } else {
                    resolve({ id_usuario });
                }
            });
        });
    },

    loginUser: (nombre_usuario, contraseña) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Usuarios WHERE nombre_usuario = ? AND contraseña = ?`;
            db.get(sql, [nombre_usuario, contraseña], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    resolve(row);
                } else {
                    resolve(null);
                }
            });
        });
    },
};

module.exports = UserModel;

